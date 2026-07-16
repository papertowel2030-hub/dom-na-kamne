(function () {
  "use strict";

  var img = "../assets/img/";
  var ref = "../assets/img/Services/services/";

  window.DNK_SERVICE_ORDER = [
    "doma",
    "bani",
    "garazhi",
    "besedki",
    "zabory",
    "krovlya",
    "fundament",
    "fasady",
    "otdelka",
    "inzheneriya"
  ];

  window.DNK_SERVICE_DATA = {
    doma: {
      navTitle: "Дома",
      metaTitle: "Дома под ключ",
      referenceImage: ref + "houces.png",
      cards: [
        {
          title: "Каркасные дома",
          image: img + "house-frame.jpg",
          imageAlt: "Каркасный дом",
          bullets: [
            "Короткие сроки строительства",
            "Гибкий дизайн проекта",
            "Доступная стоимость",
            "Энергоэффективные"
          ]
        },
        {
          title: "Дома из керамических блоков",
          image: img + "house-keramoblok.jpg",
          imageAlt: "Дом из керамических блоков",
          bullets: [
            "Прочные и долговечные",
            "Разнообразная отделка фасада",
            "Высокая звукоизоляция",
            "Энергоэффективные"
          ]
        },
        {
          title: "Дома из теплоблоков",
          image: img + "house-teploblok.jpg",
          imageAlt: "Дом из теплоблоков",
          bullets: [
            "Короткие сроки строительства",
            "Прочные и долговечные",
            "Экономичные",
            "Энергоэффективные"
          ]
        },
        {
          title: "Дома из бетонных блоков",
          image: img + "house-beton.jpg",
          imageAlt: "Дом из бетонных блоков",
          bullets: [
            "Прочные и долговечные",
            "Высокая звукоизоляция",
            "Экономичные",
            "Энергоэффективные"
          ]
        },
        {
          title: "Комбинированные дома (блоки и каркас)",
          image: img + "house-combined.jpg",
          imageAlt: "Комбинированный дом из блоков и каркаса",
          bullets: [
            "Гибкий дизайн проекта",
            "Универсальные",
            "Экономичные",
            "Энергоэффективные"
          ]
        }
      ],
      promo: {
        title: "Баня со скидкой 10% при заказе дома под ключ",
        text: "Оставьте заявку и получите смету строительства дома и бани.",
        image: img + "banya-interior.jpg",
        imageAlt: "Интерьер бани из дерева",
        ctaLabel: "Получить скидку"
      }
    },

    bani: {
      navTitle: "Бани",
      metaTitle: "Бани под ключ",
      referenceImage: ref + "banya.png",
      cards: [
        {
          title: "Каркасные бани",
          image: img + "banya-frame.jpg",
          imageAlt: "Каркасная баня",
          bullets: [
            "Протапливается за 40 минут",
            "Строительство из досок камерной сушки",
            "Фольгированная пароизоляция",
            "Экономия на фундаменте",
            "Установка на участке за 1 день"
          ]
        },
        {
          title: "Бани из профилированного бруса",
          image: img + "banya-brus.jpg",
          imageAlt: "Баня из профилированного бруса",
          bullets: [
            "Протапливается за 1.5-2 часа",
            "Не требует отделки",
            "Возводится с учетом усадки",
            "Сборка на участке за 10-15 дней"
          ]
        }
      ]
    },

    garazhi: {
      navTitle: "Гаражи",
      metaTitle: "Гаражи под ключ",
      referenceImage: ref + "garage.png",
      cards: [
        {
          title: "Гаражи под ключ",
          image: img + "garage.jpg",
          imageAlt: "Гараж на загородном участке",
          bullets: [
            "Строим гаражи на 1, 2 или 3 машиноместа",
            "Возможность устройства подвала, второго этажа или пристройки",
            "Работаем с разными типами конструкций и материалами"
          ]
        }
      ]
    },

    besedki: {
      navTitle: "Беседки",
      metaTitle: "Беседки и мангальные зоны",
      referenceImage: ref + "summerhouces.png",
      cards: [
        {
          title: "Беседки и мангальные зоны под ключ",
          images: [
            img + "service-cards/besedki-summerhouse.png",
            img + "mangal-zone.jpg"
          ],
          imageAlt: "Беседка и мангальная зона",
          bullets: [
            "Короткие сроки строительства",
            "Обрабатываем беседку средствами, чтобы конструкция была долговечной",
            "Низкая стоимость строительства"
          ]
        }
      ]
    },

    zabory: {
      navTitle: "Заборы",
      metaTitle: "Заборы и ворота",
      referenceImage: ref + "fence.png",
      cards: [
        {
          title: "Заборы",
          images: [
            img + "fence-wood.jpg",
            img + "fence-metal.jpg"
          ],
          imageAlt: "Забор на участке",
          bullets: [
            "Классические деревянные",
            "Металлические",
            "Учитываем особенности участка",
            "Даем гарантию на монтаж и материалы"
          ]
        },
        {
          title: "Откатные ворота",
          image: img + "gates.jpg",
          imageAlt: "Откатные ворота",
          bullets: [
            "Возможность установки электропривода и пульта ДУ",
            "Экономия пространства",
            "Даем гарантию на монтаж и материалы"
          ]
        }
      ]
    },

    krovlya: {
      navTitle: "Кровля",
      metaTitle: "Кровля",
      referenceImage: ref + "roof.png",
      cards: [
        {
          title: "Кровля",
          intro: "Мы предлагаем:",
          images: [
            img + "roof-1.jpg",
            img + "roof-2.jpg"
          ],
          imageAlt: "Кровельные работы",
          bullets: [
            "Мягкая кровля",
            "Металлочерепица",
            "Профнастил",
            "Битумная черепица"
          ]
        }
      ]
    },

    fundament: {
      navTitle: "Фундамент",
      metaTitle: "Фундаменты",
      referenceImage: ref + "foundation.png",
      cards: [
        {
          title: "Свайный фундамент",
          image: img + "foundation-pile-2.jpg",
          imageAlt: "Свайный фундамент",
          bullets: [
            "Экономичный",
            "Устойчивый к просадкам",
            "Подходит для частных домов и хозяйственных построек на сложных рельефах"
          ]
        },
        {
          title: "Плиточный фундамент",
          image: img + "foundation-tile.jpg",
          imageAlt: "Плиточный фундамент",
          bullets: [
            "Высокая несущая способность",
            "Устойчивый к грунтовым водам",
            "Имеет защиту от пучения",
            "Подходит для малоэтажных зданий с массивными стенами и сложными конструкциями"
          ]
        },
        {
          title: "Монолитная плита",
          image: img + "foundation-slab.jpg",
          imageAlt: "Монолитная плита",
          bullets: [
            "Выдерживает любые нагрузки",
            "Отсутствует потребность в дополнительной гидроизоляции",
            "Может служить основанием для пола",
            "Подходит для коттеджей, загородных домов и объектов с надежным основанием"
          ]
        },
        {
          title: "Шведская плита (УШП)",
          image: img + "foundation-ushp.jpg",
          imageAlt: "Шведская плита с инженерными коммуникациями",
          bullets: [
            "Энергоэффективна",
            "Интегрирована система отопления",
            "Коммуникация закладывается на этапе заливки"
          ]
        }
      ]
    },

    fasady: {
      navTitle: "Фасады",
      metaTitle: "Фасады под ключ",
      referenceImage: ref + "front.png",
      cards: [
        {
          title: "Фасады под ключ",
          intro: "Мы предлагаем:",
          images: [
            img + "facade-1.jpg",
            img + "facade-2.jpg",
            img + "facade-3.jpg"
          ],
          imageAlt: "Фасад частного дома",
          bullets: [
            "Вентилируемые фасады",
            "Штукатурные фасады",
            "Фасадные панели и сайдинг",
            "Клинкерная плитка и кирпич",
            "Теплоизоляционные системы"
          ]
        }
      ]
    },

    otdelka: {
      navTitle: "Отделка",
      metaTitle: "Отделочные работы",
      referenceImage: ref + "finishing.png",
      cards: [
        {
          title: "Отделочные работы",
          intro: "Мы предлагаем:",
          images: [
            img + "service-cards/finishing-floor.png",
            img + "service-cards/finishing-shower.png"
          ],
          imageAlt: "Внутренняя отделка помещения",
          bullets: [
            "Отделка пола",
            "Отделка потолка",
            "Отделка стен",
            "Демонтаж старых материалов и перекрытий, сантехники и электрики"
          ]
        }
      ]
    },

    inzheneriya: {
      navTitle: "Инженерия",
      metaTitle: "Инженерные сети",
      referenceImage: ref + "engineering.png",
      cards: [
        {
          title: "Инженерные сети",
          intro: "Мы предлагаем:",
          images: [
            img + "engineering-2.jpg",
            img + "engineering-1.jpg"
          ],
          imageAlt: "Инженерные системы в доме",
          bullets: [
            "Монтаж оборудования",
            "Электрика",
            "Отопление",
            "Канализация",
            "Вентиляция",
            "Наружные сети"
          ]
        }
      ]
    }
  };
})();
