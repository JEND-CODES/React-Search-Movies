import React, { Component } from 'react';

import styled from 'styled-components';

import $ from 'jquery';

function refreshPage(){ 
    window.location.reload(); 
}

class ApiMapNews extends Component {
    constructor() {
        super()
        this.state = {
          data: null,
          data_first: null,
          button: true,
          // On définit le query empty (qui va être rempli par l'utilisateur dans l'input dédié)
          query:'',
          
        }
        this.handleClick = this.handleClick.bind(this);
        this.handlechange = this.handlechange.bind(this);
      }

      handleClick(){
        this.setState({
          button:!this.state.button
        })
      }

      // Cela va récupérer les noms entrés dans l'input
      handlechange(e) {
        // On récupère les valeurs-noms entrées dans l'input (cela va permettre ensuite de les injecter dans l'URL de l'API)
        this.setState({query: e.target.value});
        // On met à jour la requête vers l'API
        this.getData();
      }

      componentDidMount() {
          /*
        $(".hide-first-datas").click(function () {
            // On retire :
            $('.first-datas-container').css('display', 'none');
        });
        */
        // CodePen Home Scroll to top button : démo https://codepen.io/michalwyrwa/pen/GBaPPj
        $(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		// scroll body to 0px on click
		$('#back-to-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
        });
        
      }
      
    getData() {

       // Pour faire par exemple une requête des films tendances du moment : https://api.themoviedb.org/3/trending/all/day?api_key=????

        // On injecte dans l'Url de l'API les valeurs textes entrées dans l'input, cet input appelle la fonction "handlechange()"
        let tmdbURL = `https://api.themoviedb.org/3/search/movie?api_key=(????)&language=fr&query=${this.state.query}`;

        let data = fetch(tmdbURL)

        .then((res) => {
            res.json().then((resp) => {
                console.log(resp.results)
                this.setState({ data: resp.results })
            })
        })
    }
    
    render() {

// Ajout du scroll to top pour chaque transition entre les pages
window.scrollTo(0, 0);

        return (

            <CardFlipApiLoops>

                <div className="special-buttons">
                
                {/* Boutons pour reload de la page */}
                <button className="button-effect btn-3 hide-first-datas" onClick={ refreshPage }>
                    <i className="fas fa-redo"></i>
                </button>

                </div>

                <section className="grid">
        <div className="container-fluid">
            
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <div></div>
                </div>
                <div className="col-md-4 col-sm-12">
                    <div>
                        {/* Cet input permet de mettre à jour le filtrage d'informations en provenance de l'API TMDB */}
                        
                        <input type='text' placeholder="Que cherchez-vous ?" onChange={this.handlechange}/>

                    </div>
                </div>
                <div className="col-md-4 col-sm-12">
                    <div></div>
                </div>
            </div>
        </div>
    </section>
 

<MultiDatasApi>

                {
                    this.state.data ?

                    this.state.data.map((item) =>
                    
                    <div className="container-fluid">
         
                        <div className="row">

                            <div className="col-12 mt-3">
          
                                <div className="card border-0">

                                    <div className="card-horizontal">

                                    <div className="img-square-wrapper">

                                        <div className="grid">

                                            <figure className="effect-bubba">

                                                <a href={`https://www.google.com/search?q=${item.title}`} target="_blank">
                                                    <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className="movie-img" alt={item.title} title={item.title} onError={(e)=>{e.target.onerror = null; e.target.src="images/elegantWallpaper.jpg"}}/>
                                                </a>

                                                <figcaption>
                                                    
                                                    <p style={{ fontSize: '20px', background: 'white'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;En savoir plus</p>
                                                
                                                </figcaption>
                                            
                                            </figure>

                                        </div>

                                        </div>   

                                    <div className="card-body">

                                        <a href={`https://www.google.com/search?q=${item.title}`} target="_blank">
                                            <h3 className="card-title colored-text" style={{ fontSize: '26px'}}>{item.title}&nbsp;({item.release_date&&item.release_date.split('-')[0]})</h3>
                                        </a>

                                        <h5><i className="fa fa-star movie-star"></i>&nbsp;Note : {item.vote_average}</h5>

                                        <br></br>

                                        <h4 className="card-title" style={{ fontSize: '18px'}}>{item.overview}</h4>

                                    </div>
 
                                    </div>

                                </div>

                            </div>
              
                        </div>

                        <br />
                        <hr />
                        
                    </div>

                    )

                    :
                    (
                        <div>
                            
                        </div>
                    
                    )

                }
</MultiDatasApi>

<a id="back-to-top" href="#" className="btn btn-light btn-lg back-to-top" role="button"><i className="fas fa-chevron-up"></i></a>
                
            </CardFlipApiLoops>
        )
    }
}

export default ApiMapNews;

const CardFlipApiLoops = styled.section `

font-family: 'Quicksand', sans-serif;

margin-top:75px;

@media (min-width:1000px) {
    margin-left:10%;
    margin-right:10%;
}

/* CodePen Home
Scroll to top button */

.back-to-top {
    position: fixed;
    bottom: 25px;
    right: 25px;
    display: none;
}

.colored-text {
    color:#005bee;
    transition: 0.5s;
}

.colored-text:hover {
    color:#1D233D;
    transition: 0.5s;
    
}

.card-horizontal {
    display: flex;
    flex: 1 1 auto;
}

.card-horizontal a {
    text-decoration:none;
}

.switch-img {
    max-width:500px;
}

@media (max-width:1000px) {
    .switch-img {
        width:100%;
        max-width:100%;
    }
}

.movie-img {
    max-width:300px;
}

@media (max-width:1000px) {
    .movie-img {
        width:100%;
        max-width:100%;
    }
}

@media (max-width:1000px) {
    .card-horizontal {
        display: inline; 
    }
}

.movie-star {
    color: #fcd000;
}

input[type=text] {
    width: 100%;
    padding: 10px 13px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-sizing: border-box;
    transition: 0.5s;
    outline: none;
    text-align:center;
}

input[type=text]:focus {
    border: 1px solid #555;
  }

/* Bubba Image Hover effect -> Démo Codepen https://codepen.io/maheshambure21/pen/GgVbVW */

figure.effect-bubba img {
	opacity: 1;
    transition: opacity 0.35s;
    border:1px solid #bdbdbd;
    padding:3px;
}

@media (max-width:1000px) {
    figure.effect-bubba img {
        width:30%;
        margin-left:20px;
        
    }
}

@media (max-width:700px) {
    figure.effect-bubba img {
        width:100%;
        margin-left:0px;
        
    }
}

figure.effect-bubba:hover img {
	opacity: 0.85;
}

figure.effect-bubba p {
    margin-top:-30px;
    
    opacity: 0;
    
    color:#1D233D;
    
	transition: opacity 0.35s, transform 0.35s;
	
	transform: translate3d(0,20px,0);
}

figure.effect-bubba:hover p {
	opacity: 1;
	
	transform: translate3d(0,0,0);
}


/* Buttons container */

.special-buttons {
    text-align:center;
}

/* GENERAL BUTTON STYLING */

.button-effect,
.button-effect::after {
	transition: all 0.4s;
}

.button-effect {
  background: none;
  border: 0px solid blue;
  border-radius: 5px;
  color: grey;
  display: inline;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  margin: 10px;
  position: relative;
  outline-style: none;
  
}

.button-effect::before,
.button-effect::after {
  background: #cccccc;
  border: 0px solid blue;
  border-radius: 20px;
  content: '';
  position: absolute;
  z-index: -1;
}

.button-effect:hover {
  color: white;
}

/* Buttons Hover Effects : Codepen démo https://codepen.io/ritchiejacobs/pen/qEJjBM */

/* BUTTON 1 */
.btn-1::after {
  height: 0;
  left: 0;
  top: 0;
  width: 100%;
}

.btn-1:hover:after {
  height: 100%;
}

/* BUTTON 2 */
.btn-2::after {
  height: 100%;
  left: 0;
  top: 0;
  width: 0;
}

.btn-2:hover:after {
  width: 100%;
}

/* BUTTON 3 */
.btn-3::after {
  height: 0;
  left: 50%;
  top: 50%;
  width: 0;
}

.btn-3:hover:after {
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
}

/* BUTTON 4 */
.btn-4::before {
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
}

.btn-4::after {
  background: white;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
}

.btn-4:hover:after {
  height: 0;
  left: 50%;
  top: 50%;
  width: 0;
}


`;

const MultiDatasApi = styled.section `

border-left:1px solid #dcdcdc;
border-right:1px solid #dcdcdc;

`;


