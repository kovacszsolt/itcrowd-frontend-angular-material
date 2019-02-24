export class TweetModel {
  public createTime = '';
  public description = '';
  public extension = '';
  public id = '';
  public image = '';
  public shorturl = '';
  public slug = '';
  public status = '';
  public tags = [];
  public text = '';
  public title = '';
  public url = '';
  public _id = '';

  public constructor(data = {}) {
    Object.assign(this, data);
  }
}
