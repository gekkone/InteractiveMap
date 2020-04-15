import axios from 'axios'

export default class QuestPointManager {
    constructor() {
        this.data = {
            1: {
                id: 1,
                mapPoint: {
                    x: 1650,
                    y: 1000
                },
                message: "Привет, это начало истории",
                decisions: [
                    {
                        id: 2,
                        text: "Начать"
                    }
                ]
            },
            2: {
                id: 2,
                mapPoint: {
                    x: 1820,
                    y: 2000,
                },
                message: "Ну вот ты и пришёл куда-то. Это демо версия, никакой истории я вставлять не стал. Вернёмся к началу?",
                decisions: [
                    {
                        id: 1,
                        text: "Начать с начала"
                    },
                    {
                        id: 3,
                        text: "Сходим ещё куда-нибудь"
                    }
                ]
            },
            3: {
                id: 3,
                mapPoint: {
                    x: 1200,
                    y: 3400,
                },
                message: "Здесь тоже ничего интересного не будет. Возвращаемся к началу",
                decisions: [
                    {
                        id: 1,
                        text: "Теперь уже точно к началу"
                    }
                ]
            }
        }
    }

    questPoint(id) {
        let data = this.data[id] || null;
        if (data == null) {
            console.error("Нет такого квеста");
        }

        return data
        // axios.get(`/questPoint/get/${id}`).then(() => {

        // }).catch((e)=>{
        //     console.error(e);
        //     return null;
        // });
    }


}
