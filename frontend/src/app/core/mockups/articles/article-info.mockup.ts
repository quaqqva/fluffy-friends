export class ArticleInfoMockup {
  static empty = {
    id: 0,
    title: '',
    content: '',
    minPrice: 0,
    maxPrice: 0,
    views: 0,
    publishedAt: '',
    photoUrl: '',
    category: '',
    comments: [],
  };

  static response = {
    id: 1,
    title: '5 причин не заводить невскую маскарадную',
    content: '<p>Текст статьи</p>',
    minPrice: 100,
    maxPrice: 100000,
    views: 10,
    publishedAt: new Date().toISOString(),
    photoUrl: 'google.com',
    category: 'Кошки',
    comments: [],
  };
}
