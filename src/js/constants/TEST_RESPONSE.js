const TEST_RESPONSE = `
{
  "status": "ok",
  "totalResults": 82,
  "articles": [
      {
          "source": {
              "id": "lenta",
              "name": "Lenta"
          },
          "author": "Кира Александрова",
          "title": "Опубликована первая фотография внучки певицы Валерии",
          "description": "Невестка певицы Валерии Лиана Шульгина, родившая 1 января дочь, опубликовала ее первое фото. По ее словам, ребенка назвали Селин. «Сеня + Лиана = Селин. Арсений Шульгин, я тебя очень сильно люблю, спасибо тебе что ты был рядом все время!» — обратилась блогерш…",
          "url": "https://lenta.ru/news/2021/01/01/selin/",
          "urlToImage": "https://icdn.lenta.ru/images/2021/01/01/23/20210101230204307/share_c99779f588956cad8789914379836faf.jpg",
          "publishedAt": "2021-01-01T20:10:27Z",
          "content": ", 1 , Instagram-.\r\n , . « + = . , , !» .\r\n . () .\r\n , . « , . , », . , , , , ."
      },
      {
          "source": {
              "id": "lenta",
              "name": "Lenta"
          },
          "author": "Марк Успенский",
          "title": "Опубликована снятая перед смертью фотография пассажирки разбившегося Boeing",
          "description": "Пассажирка разбившегося в Индонезии Boeing 737-524 сняла себя на камеру перед смертью и отправила семье сообщение незадолго до крушения. По информации издания, перед вылетом Ратих Виндания (Ratih Windania), путешествовавшая с двумя детьми, поделилась своим сн…",
          "url": "https://lenta.ru/news/2021/01/11/indonesiaflight/",
          "urlToImage": "https://icdn.lenta.ru/images/2021/01/11/15/20210111153133078/share_6b3b5ce829c9f63413493b2ea4048656.jpg",
          "publishedAt": "2021-01-11T13:31:55Z",
          "content": "Boeing 737-524 . Daily Mail.\r\n , (Ratih Windania), , . , , .\r\n , : «, , . ». , , , . , .\r\n, Boeing 737-524 . , , . .\r\n Sriwijaya Air, , 9 , . , . , 59 , . , 62 , . ."
      },
      {
          "source": {
              "id": "lenta",
              "name": "Lenta"
          },
          "author": "Адам Гурьев",
          "title": "Кадыров нарушил масочный режим на встрече с зараженным коронавирусом бойцом ММА",
          "description": "Глава Чечни Рамзан Кадыров нарушил масочный режим и встретился в Грозном с бойцом ММВ Хамзатом Чимаевым, который ранее отменил бой на турнире ММА из-за подтвержденного коронавируса. На фотография заметно, что за накрытым столом рядом со спортсменом сидит глав…",
          "url": "https://lenta.ru/news/2021/01/06/kadyrov/",
          "urlToImage": "https://icdn.lenta.ru/images/2021/01/06/17/20210106170739720/share_5a68e71733954a827c37571aa013f25b.jpg",
          "publishedAt": "2021-01-06T14:20:22Z",
          "content": ", - . « ».\r\n «». « . », , .\r\n , . .\r\n , , 20 , - . , .\r\n : ."
      },
      {
          "source": {
              "id": null,
              "name": "Trends.rbc.ru"
          },
          "author": "Ася Зуйкова",
          "title": "Что такое вычислительная фотография",
          "description": "В октябре Apple представила iPhone 12 Pro и 12 Pro Max со встроенными лидарами. До этого они появились в смартфонах Samsung. Это говорит о том, что вычислительная фотография выходит на первый план",
          "url": "https://trends.rbc.ru/trends/industry/5fdbb4d29a7947baa9106733",
          "urlToImage": "https://s0.rbk.ru/v6_top_pics/media/img/9/60/756082950186609.jpg",
          "publishedAt": "2021-01-01T12:00:34Z",
          "content": ",  — , . , .   , LightRoom Photoshop. , , , , Instagram.\r\n , , . . , , iOS 5.0, 2011 . , , « » .\r\n  — , (, Pixelmator). , , .\r\n,  — . , HDR . ,  — . HDR , , , - iPhone, Pixel Samsung Galaxy. 90% .\r\n … [+240 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "3dnews.ru"
          },
          "author": null,
          "title": "Фото дня: «скульптурная» спиральная галактика с перемычкой",
          "description": "Орбитальный телескоп «Хаббл» (NASA/ESA Hubble Space Telescope) продолжает радовать великолепными снимками космических просторов: на этот раз в рубрике «Изображение недели» представлена фотография галактики с обозначением NGC 613. Названный объект располагаетс…",
          "url": "https://3dnews.ru/1029711/foto-dnya-skulpturnaya-spiralnaya-galaktika-s-peremichkoy",
          "urlToImage": "https://3dnews.ru/assets/external/illustrations/2021/01/11/1029711/sculp0.jpg",
          "publishedAt": "2021-01-11T11:17:00Z",
          "content": "«» (NASA/ESA Hubble Space Telescope) : « » NGC 613.\r\n 65 . (William Herschel) 1798 .\r\nNGC 613 — . , .\r\n ( ) . , , .\r\n, NGC 613 : , . ."
      },
      {
          "source": {
              "id": null,
              "name": "Meduza"
          },
          "author": null,
          "title": "Стоматолог повесил у себя в туалете фотографию туалета с фотографией туалета с фотографией туалета… Короче, Нолан — гений",
          "description": "Пользователь реддита pinkholey пришел на прием к стоматологу, но оказался в фильме Кристофера Нолана «Начало». Дело в том, что на стене в офисной уборной висит фотография этого самого туалета — и на ней также изображена фотография этого же туалета. В свою оче…",
          "url": "https://meduza.io/shapito/2021/01/08/stomatolog-povesil-u-sebya-v-tualete-fotografiyu-tualeta-s-fotografiey-tualeta-s-fotografiey-tualeta-koroche-nolan-geniy",
          "urlToImage": "https://meduza.io/imgly/share/1610116515/shapito/2021/01/08/stomatolog-povesil-u-sebya-v-tualete-fotografiyu-tualeta-s-fotografiey-tualeta-s-fotografiey-tualeta-koroche-nolan-geniy",
          "publishedAt": "2021-01-08T14:34:47Z",
          "content": "pinkholey    ,     «».  ,            .   ,      , !\r\n,   , ,  .   ,   : - , - , -   .   ,    .\r\n ,     . , - ."
      },
      {
          "source": {
              "id": null,
              "name": "Blues.d3.ru"
          },
          "author": "https://blues.d3.ru",
          "title": "Фотография неизвестного блюзмена",
          "description": "Написал непокорный kuzimoto\n на blues.d3.ru\n /\n комментировать",
          "url": "https://blues.d3.ru/fotografiia-neizvestnogo-bliuzmena-2098694/",
          "urlToImage": "https://cdn.jpg.wtf/futurico/ba/9e/1610145524-ba9e2a0f75ad6e38eb85bcefca593fc8.jpeg",
          "publishedAt": "2021-01-08T22:50:04Z",
          "content": null
      },
      {
          "source": {
              "id": null,
              "name": "Eurosport.ru"
          },
          "author": "Василий Легейдо",
          "title": "Юрген Клопп не умеет проигрывать. Тренер «Ливерпуля» зря набросился на «Манчестер Юнайтед» и судей - Eurosport RU",
          "description": "<ol><li>Юрген Клопп не умеет проигрывать. Тренер «Ливерпуля» зря набросился на «Манчестер Юнайтед» и судей  Eurosport RU\r\n</li><li>Моуринью о словах Рэшфорда: «Обратитесь к Opta и сделайте выводы сами. «Ливерпуль» – «МЮ» – и так довольно гро  Sports.ru\r\n</li>…",
          "url": "https://www.eurosport.ru/football/premier-league/2020-2021/story_sto8071501.shtml",
          "urlToImage": "https://i.eurosport.com/2021/01/17/2972907-61014068-2560-1440.jpg",
          "publishedAt": "2021-01-17T11:01:01Z",
          "content": "«» : , . « » «» « » . \r\n 4 «» «» , , . , , . \r\n 2019- , . « , . , , . , 70-80 , ». - , «» , , , . \r\n , . « «» , « ». «» «», , , ». : , «» . , 10 . «» , , . \r\n . , , . «», : « . , , . 12:30 . , . , ».… [+595 chars]"
      },
      {
          "source": {
              "id": null,
              "name": "Photoshop.d3.ru"
          },
          "author": "https://photoshop.d3.ru",
          "title": "Как сделать такой эффект в PhotoShop?",
          "description": "Нужно сделать на картинке (фотография) эффект \"барельефа\". Как это сделать в ФШ?\n\n\n \n\nНаписал elicaster\n на photoshop.d3.ru\n /\n комментировать",
          "url": "https://photoshop.d3.ru/kak-sdelat-takoi-effekt-v-photoshop-2103165/",
          "urlToImage": "https://cdn.jpg.wtf/futurico/78/c3/1611076444-78c3db21d5aa26cac8eeb7922cf04939.jpeg",
          "publishedAt": "2021-01-19T17:22:28Z",
          "content": null
      }
  ]
}
`;

export {TEST_RESPONSE};