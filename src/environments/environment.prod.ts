export const environment = {
  production: true,
  databaseTweet: {
    version: 2,
    name: 'tweet',
    tableName: 'tweet',
    index: [
      'slug'
    ]
  },
  databaseTag: {
    version: 2,
    name: 'tags',
    tableName: 'tags',
    index: [
      'tag'
    ]
  },
  itemPerPage: 8
};
