class Post {
    constructor(title, img) {
        this.title = title;
        this.img = img;
        this.date = new Date();
    }
    toString() {
        let { title, date, img } = this;
        date = date.toJSON();
        return JSON.stringify({
            title, date, img
        }, null, 4);
    }
}

export default Post;