<?php
/**
 * Lead form handler for dom-na-kamne.ru (Beget hosting).
 *
 * Receives a JSON POST from the site forms and e-mails the lead to the company.
 * Returns {"ok": true} on success or {"ok": false, "error": "..."} with a 4xx/5xx status.
 *
 * Beget: create the FROM mailbox in the panel (Почта) so mail.ru does not
 * flag the message as spam.
 */

const TO_EMAIL   = 'dom-na-kamne@mail.ru';
const FROM_EMAIL = 'noreply@dom-na-kamne.ru';
const FROM_NAME  = 'Сайт Дом на камне';

const RATE_LIMIT  = 5;    // max submissions...
const RATE_WINDOW = 600;  // ...per IP per 10 minutes

const METHODS = [
    'phone'    => 'Телефон',
    'telegram' => 'Telegram',
    'max'      => 'MAX',
    'whatsapp' => 'WhatsApp',
    'email'    => 'E-mail',
];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

/** Trim, drop control characters (blocks header injection), cap length. */
function clean($value, int $max = 200): string
{
    if (!is_string($value)) return '';
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
    return mb_substr(trim($value), 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'method']);
}

// Only accept requests from our own pages.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$ownHost = preg_replace('/:\d+$/', '', strtolower($_SERVER['HTTP_HOST'] ?? ''));
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $ownHost) {
    respond(403, ['ok' => false, 'error' => 'origin']);
}

$raw = file_get_contents('php://input', false, null, 0, 8192);
$in  = json_decode($raw ?: '', true);
if (!is_array($in)) {
    respond(400, ['ok' => false, 'error' => 'payload']);
}

// Honeypot: the hidden "lead_ref" field is empty for people. Bots get the
// usual answer so they have no reason to retry, but nothing is sent.
if (($in['lead_ref'] ?? '') !== '') {
    respond(200, ['ok' => true]);
}

foreach (['topic', 'method', 'phone', 'email', 'username', 'page'] as $field) {
    if (isset($in[$field]) && !is_string($in[$field])) {
        respond(422, ['ok' => false, 'error' => $field]);
    }
}

$topic    = clean($in['topic'] ?? '') ?: 'Заявка с сайта';
$method   = isset(METHODS[$in['method'] ?? '']) ? $in['method'] : 'phone';
$phone    = clean($in['phone'] ?? '', 40);
$email    = clean($in['email'] ?? '', 120);
$username = clean($in['username'] ?? '', 80);
$page     = clean($in['page'] ?? '', 300);

$digits = preg_replace('/\D/', '', $phone);
if ($phone !== '' && !preg_match('/^[78]\d{10}$/', $digits)) {
    respond(422, ['ok' => false, 'error' => 'phone']);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, ['ok' => false, 'error' => 'email']);
}
if ($phone === '' && $email === '' && $username === '') {
    respond(422, ['ok' => false, 'error' => 'contact']);
}
if (($in['consent'] ?? null) !== true) {
    respond(422, ['ok' => false, 'error' => 'consent']);
}

// Simple per-IP rate limit, stored in the system temp dir.
$ip     = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$bucket = sys_get_temp_dir() . '/dnk_rate_' . md5($ip);
$now    = time();
$hits   = array_filter(
    is_file($bucket) ? (array) json_decode((string) file_get_contents($bucket), true) : [],
    fn($t) => is_int($t) && $t > $now - RATE_WINDOW
);
if (count($hits) >= RATE_LIMIT) {
    respond(429, ['ok' => false, 'error' => 'rate']);
}
$hits[] = $now;
@file_put_contents($bucket, json_encode(array_values($hits)), LOCK_EX);

// Build the message.
if ($phone !== '') {
    $phone = '+7 ' . substr($digits, 1, 3) . ' ' . substr($digits, 4, 3) . '-' . substr($digits, 7, 2) . '-' . substr($digits, 9, 2);
}
$lines = ["Тема: $topic", 'Способ связи: ' . METHODS[$method]];
if ($phone !== '')    $lines[] = "Телефон: $phone";
if ($email !== '')    $lines[] = "E-mail: $email";
if ($username !== '') $lines[] = "Имя пользователя: $username";
$lines[] = '';
if ($page !== '')     $lines[] = "Страница: $page";
$lines[] = 'Отправлено: ' . (new DateTime('now', new DateTimeZone('Asia/Krasnoyarsk')))->format('d.m.Y H:i') . ' (Красноярск)';
$lines[] = 'Клиент дал согласие на обработку персональных данных.';

$subject = '=?UTF-8?B?' . base64_encode("Заявка с сайта: $topic") . '?=';
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    'From: =?UTF-8?B?' . base64_encode(FROM_NAME) . '?= <' . FROM_EMAIL . '>',
];
if ($email !== '') {
    $headers[] = "Reply-To: $email";
}

$sent = mail(
    TO_EMAIL,
    $subject,
    chunk_split(base64_encode(implode("\r\n", $lines))),
    implode("\r\n", $headers),
    '-f' . FROM_EMAIL
);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'mail']);
}
respond(200, ['ok' => true]);
