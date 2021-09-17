var page_id = "164249414233789";
var page_access_token = "EAAFfZBhdrndkBAOeEV6Ihmg7YGdIpEwh9tzUQH50ZCGu2ovjZAYnusIH9KuZAAXoolPAvcUU8Mkw8LetfZCVCogJS41087laQQ4rVkZBe9Gy38MbzcLDHWWaji4CdWhYktAfwdc3kctc2k0LK8Qyc1OHV2lz3y1SjPRRr6UWR1RPAfrVRdwhGZB"
const infos_sur_les_posts = "https://graph.facebook.com/"+page_id+"/feed?period=month&access_token="+page_access_token+"&fields=attachments,likes.summary(true),comments.summary(true),shares";
const infos_sur_la_page = "https://graph.facebook.com/"+page_id+"/insights?metric=page_fan_adds,page_views_total,page_impressions_unique&period=month&access_token="+page_access_token;
const profil_page = "https://graph.facebook.com/"+page_id+"/picture"

let post_traitement ;
var partages;
var commentaires;
var likes;
var description;
var sans_description;
var image;
var hauteur_image;
var largeur_image;
var raw = ``;
const description_id = document.getElementById('description');
const image_id = document.getElementById('image')
const posts_id = document.getElementById('posts');
const post_search = async() =>{
    post_traitement = await fetch(infos_sur_les_posts)
    .then (res => res.json())
    console.table( "post_search :",post_traitement)
    post_traitement.data.forEach((element, index) => {
        likes = element.likes.summary.total_count;
        commentaires = element.comments.summary.total_count;
        if(element.shares == undefined){
            console.log("partages == 0");
        }else{
            partages = element.shares.count;
        }
        console.log( "nombres de likes :", likes ); 
        console.log( "nombres de commentaires :", commentaires );
        console.log( "nombres de partages :", partages );

        if(element.attachments == undefined){
            console.log("attachements indefinis") 
            raw =
                `
                  <p> ce posts est un message </p>
                  <div class="diagramme" id="diagramme_${index}">
           
                  </div>
                
                `
            
            posts_id.innerHTML += raw
        }
        else{
            element.attachments.data.forEach(element => {
                image = element.media.image.src;  
                hauteur_image = element.media.image.height;
                largeur_image = element.media.image.width;

                if(element.description == undefined){
                    sans_description = " ce post n'a pas de decription "
                    raw = 
                        ` 
                          
                          <div> 
                          <p> ${sans_description} </p>
                            <img class="fit-picture" src=${image}
                            alt="Grapefruit slice atop a pile of other slices" height =" ${hauteur_image}px" width =" ${largeur_image}px">
                          </div>
                          <div class="diagramme" id="diagramme_${index}">
            
                          </div>
                        
                        `
                    posts_id.innerHTML += raw
                }
                else{
                    description = element.description;
                    raw =
                        `
                        
                        <div> 
                          <p> ${description} </p>  
                          <img class="fit-picture" src=${image}
                          alt="Grapefruit slice atop a pile of other slices" height =" ${hauteur_image}px" width =" ${largeur_image}px">
                        </div>
                        <div class="diagramme" id="diagramme_${index}">
           
                        </div>                      
                        
                        `
                    posts_id.innerHTML += raw
                }
            });

            

        }
        
        

       // Chart.defaults.global.defaultFontSize = 18;

        var graphie = document.createElement("canvas");

        let massPopChart = new Chart(graphie.getContext("2d"), {
            type: "line", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
            data: {
                labels: [
                "nombres de likes",
                "nombres de partages ",
                "nombres de commentaires"
                ],
                datasets: [
                {
                    data: [likes,partages,commentaires],
                    // backgroundColor: "blue",
                    backgroundColor: [
                    "red",
                    "orange",
                    "salmon"
                    ],
                    hoverBorderWidth: 3,
                },
                ],
            },
            options: {
                title: {
                display: true,
                text: "Statitiques des postes",
                fontSize: 24,
                },
                legend: {
                display: false,
                },
                // start at 0
                scales: {
                yAxes: [
                    {
                    ticks: {
                        beginAtZero: true,
                    },
                    },
                ],
                },
            },
        });

        var graphie_text = document.createTextNode(massPopChart);
        graphie.appendChild(graphie_text);
        if(document.getElementById(`diagramme_${index}`))
        document.getElementById(`diagramme_${index}`).appendChild(graphie)
    });

} 
post_search();


// page statistiques

let page_traitement
var valeur_fans;
var valeur_views;
var valeur_touche;
const profil = `<img class="fit-picture" src=${profil_page}
alt="Grapefruit slice atop a pile of other slices">` 
const profil_id = document.getElementById('profil').innerHTML=profil;
const page_search = async() =>{
    page_traitement = await fetch(infos_sur_la_page)
    .then (res => res.json());
    page_traitement.data.forEach( element =>{
        
        if(element.name == "page_fan_adds"){
            element.values.forEach( element =>{
                valeur_fans = element.value
            })
        }
        if(element.name == "page_views_total"){
            element.values.forEach( element =>{
                valeur_views = element.value
            })
        }
        if(element.name == "page_impressions_unique"){
            element.values.forEach( element =>{
                valeur_touche = element.value
            })
        }
        const graph = document.getElementById("graphique").getContext("2d");

        //Chart.defaults.global.defaultFontSize = 18;

        let massPopChart = new Chart(graph, {
        type: "line", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
        data: {
            labels: [
            "nombres de nouveau fans",
            "nombres de vues ",
            "nombres de touchés"
            ],
            datasets: [
            {
                data: [valeur_fans,valeur_views,valeur_touche],
                // backgroundColor: "blue",
                backgroundColor: [
                "red",
                "orange",
                "blue"
                ],
                hoverBorderWidth: 3,
            },
            ],
        },
        options: {
            title: {
            display: true,
            text: "Statitiques de la page",
            fontSize: 24,
            },
            legend: {
            display: false,
            },
            // start at 0
            scales: {
            yAxes: [
                {
                ticks: {
                    beginAtZero: true,
                },
                },
            ],
            },
        },
        });
        
            
        
    } )
}    
page_search();
/*
test = {"a":1, "b":2}
{a: 1, b: 2}
for (var key in test) {
   console.log(key) }
a
b
undefined
for (var key in test) {   
console.log(test[key])
}
1
2
*/