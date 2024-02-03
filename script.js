const fetchData = async () => {
    const data = await fetch(
        "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    return data;
}

const getCardHtmlByData = (apiData, category) => {
    const cardContainer = document.getElementById(category)
    return (apiData.forEach(card => {
        const cardHtml =   getCardLayout(card)
        cardContainer.innerHTML += cardHtml;    
    })); 
}

const getCardLayout = (cardData) => {
    return (
        `<div class="item">
            <div class="model">
                <img width="250" height="315" src=${cardData.image}>
                ${cardData?.badge_text ? '<p class="badge">' + `${cardData.badge_text}` + '</p>' : ''}
            </div>
            <div class="details">
                <div class="titleContainer">
                    <h3>${cardData.title.length > 9 ? cardData.title.substring(0,11)+'...' : cardData.title}</h3>
                    <ul><li>${cardData.vendor}</li></ul>
                </div>
                <div class="money">
                    <h4 class="price">Rs ${cardData.price}.00</h4>
                    <p class="compare">${cardData.compare_at_price}.00</p>
                    <p class="offer">${Math.floor(((cardData.compare_at_price - cardData.price) / cardData.compare_at_price) * 100)} % Off</p>
                </div>
            </div>
            <button class="btn">Add to Cart</button>
        </div> `
    )
}

document.addEventListener('DOMContentLoaded', async() => {
    const apiData = await fetchData();
    
    if(apiData){
        console.log("inside if");
        const json = await apiData.json();
        const menCard = json?.categories[0]?.category_products 
        getCardHtmlByData(menCard,  "menData")
        const womenCard = json?.categories[1]?.category_products 
        getCardHtmlByData(womenCard,  "womenData")
        const kidsCard = json?.categories[2]?.category_products
        getCardHtmlByData(kidsCard,  "kidsData")
    }
})

const showData = (category) =>{
    document.getElementById("menData").classList.add('hidden');
    document.getElementById("womenData").classList.add('hidden');
    document.getElementById("kidsData").classList.add('hidden');
    document.getElementById(`${category}Data`).classList.remove('hidden');

    const categoryButtons = document.querySelectorAll('.filter');
    categoryButtons.forEach(button => {
        if (button.id === category + 'Btn') {
            button.classList.add('activeCategory');
        } else {
            button.classList.remove('activeCategory');
        }
    });

}
