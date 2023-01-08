// const imageToBase64 = require('image-to-base64');
const { initializeApp } = require('firebase/app');

const firebaseConfig = require('../data/firebaseConfig');

const firebase = initializeApp(firebaseConfig);
const { getStorage, ref, listAll} = require('firebase/storage');
const storage = getStorage(firebase);




class Wife {
    async getPathImg(name) {
        let path = []
        const listRef = ref(storage, `/characters/${name}/image`);
            await listAll(listRef)
                .then((res) => {
                    res.items.forEach((itemRef) => {
                        path.push(itemRef.fullPath);
                    });
                }).catch((error) => {
                    console.log("Error in get Path img:", error);
                });

        return await Wife.createUrlImg({name, path})
    }
    
    static async createUrlImg({path, name}) {
        let images = [];
        path.forEach( (el) => {
            const imagesRef = ref(storage, `${el}`);
            images.push({
                link: `https://firebasestorage.googleapis.com/v0/b/${imagesRef.bucket}/o/characters%2F${name}%2Fimage%2F${imagesRef.name}?alt=media&token`,
                newLink: `https://firebasestorage.googleapis.com/v0/b/${imagesRef.bucket}/o/characters%2F${name}%2Ffull-size-image%2F${imagesRef.name}?alt=media&token`,
            })
        })
        return {images, name}
    }

    async toBase64({images}) {
        console.log(images);
        let colectionBase64 = [];
        images.forEach(el => {
            const response = imageToBase64(el)
            colectionBase64.push(response)
        })
       
        return colectionBase64
    }
}

const wife = new Wife();

module.exports = wife