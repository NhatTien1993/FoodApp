import { ICONS, IMAGES } from "./Images"

export const screens = {
    home: "home",
    detail: "detail",
    map: "map",
    tab_home: "tab_home",
    tab_search: "tab_search",
    tab_like: "tab_like",
    tab_user: "tab_user",
    search_map: "search_map",
    cart: "cart"
}
export const storeData = {
    storeId: 1,
    nameStore: 'Lotteria Võ Văn Ngân',
    addressStore: '283 Đ. Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam',
    lat: 10.8498921,
    lng: 106.7658656
}


export const categoryData = [
    {
        id: 1,
        name: "Rice",
        icon: ICONS.rice_bowl,
    },
    {
        id: 2,
        name: "Noodles",
        icon: ICONS.noodle,
    },
    {
        id: 3,
        name: "Hot Dogs",
        icon: ICONS.hotdog,
    },
    {
        id: 4,
        name: "Salads",
        icon: ICONS.salad,
    },
    {
        id: 5,
        name: "Burgers",
        icon: ICONS.hamburger,
    },
    {
        id: 6,
        name: "Pizza",
        icon: ICONS.pizza,
    },
    {
        id: 7,
        name: "Snacks",
        icon: ICONS.fries,
    },
    {
        id: 8,
        name: "Sushi",
        icon: ICONS.sushi,
    },
    {
        id: 9,
        name: "Desserts",
        icon: ICONS.donut,
    },
    {
        id: 10,
        name: "Drinks",
        icon: ICONS.drink,
    },

]

export const menuData = [
    {
        menuId: 4,
        categoryId: 1,
        name: "Hawaiian Pizza",
        photo: IMAGES.hawaiian_pizza,
        description: "Canadian bacon, homemade pizza crust, pizza sauce",
        calories: 250,
        price: 15,
        duration: "35 - 40 min",
        star: 3
    },
    {
        menuId: 5,
        categoryId: 2,
        name: "Tomato & Basil Pizza",
        photo: IMAGES.pizza,
        description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
        calories: 250,
        price: 20,
        duration: "15 - 20 min",
        star: 5
    },
    {
        menuId: 6,
        categoryId: 1,
        name: "Tomato Pasta",
        photo: IMAGES.tomato_pasta,
        description: "Pasta with fresh tomatoes",
        calories: 100,
        price: 10,
        duration: "5 - 10 min",
        star: 1
    },
    {
        menuId: 7,
        categoryId: 3,
        name: "Mediterranean Chopped Salad ",
        photo: IMAGES.salad,
        description: "Finely chopped lettuce, tomatoes, cucumbers",
        calories: 100,
        price: 10,
        duration: "35 - 40 min",
        star: 2
    },
    {
        menuId: 8,
        categoryId: 4,
        name: "Chicago Style Hot Dog",
        photo: IMAGES.chicago_hot_dog,
        description: "Fresh tomatoes, all beef hot dogs",
        calories: 100,
        price: 20,
        duration: "35 - 40 min",
        star: 5
    },
    {
        menuId: 9,
        categoryId: 8,
        name: "Sushi sets",
        photo: IMAGES.sushi,
        description: "Fresh salmon, sushi rice, fresh juicy avocado",
        calories: 100,
        price: 50,
        duration: "35 - 40 min",
        star: 4
    },
    {
        menuId: 10,
        categoryId: 1,
        name: "Kolo Mee",
        photo: IMAGES.kolo_mee,
        description: "Noodles with char siu",
        calories: 200,
        price: 5,
        duration: "35 - 40 min",
        star: 5
    },
    {
        menuId: 11,
        categoryId: 1,
        name: "Sarawak Laksa",
        photo: IMAGES.sarawak_laksa,
        description: "Vermicelli noodles, cooked prawns",
        calories: 300,
        price: 8,
        duration: "35 - 40 min",
        star: 5
    },
    {
        menuId: 12,
        name: "Nasi Lemak",
        categoryId: 1,
        photo: IMAGES.nasi_lemak,
        description: "A traditional Malay rice dish",
        calories: 300,
        price: 8,
        duration: "35 - 40 min",
        star: 2
    },
    {
        menuId: 13,
        categoryId: 1,
        name: "Nasi Briyani with Mutton",
        photo: IMAGES.nasi_briyani_mutton,
        description: "A traditional Indian rice dish with mutton",
        calories: 300,
        price: 8,
        duration: "35 - 40 min",
        star: 2
    },
    {
        menuId: 12,
        categoryId: 9,
        name: "Teh C Peng",
        photo: IMAGES.teh_c_peng,
        description: "Three Layer Teh C Peng",
        calories: 100,
        price: 2,
        duration: "35 - 40 min",
        star: 5
    },
    {
        menuId: 13,
        categoryId: 10,
        name: "ABC Ice Kacang",
        photo: IMAGES.ice_kacang,
        description: "Shaved Ice with red beans",
        calories: 100,
        price: 3,
        duration: "35 - 40 min",
        star: 2
    },
    {
        menuId: 14,
        categoryId: 10,
        name: "Kek Lapis",
        photo: IMAGES.kek_lapis,
        description: "Layer cakes",
        calories: 300,
        price: 20,
        duration: "35 - 40 min",
        star: 4
    }
]