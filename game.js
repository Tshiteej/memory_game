$(document).ready(function(){
    var click = 0;

    var App = {
        initialize: function(cards){
            this.cardsArray = $.merge(cards, cards);
            this.shuffleCards(this.cardsArray);
            this.setup();
        },

        shuffleCards: function(cardsArray){
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        shuffle: function(a){
            var counter = a.length;
            var temp;
            var random;

            while (counter > 0) {
                random = Math.floor(Math.random() * counter);
                counter--;
                temp = a[counter];
                a[counter] = a[random];
                a[random] = temp;
            }
            return a;
        },

        setup: function(){
            this.html = this.buildHTML();
            $(".game").html(this.html);
          $(".start").on("click", $.proxy(this.binding, this));
            this.paused = false;
            this.guess = null;
        },

        binding: function(){
            $(".card").on("click", this.Clicked);
            $("button.restart").on("click", $.proxy(this.reset, this));
        },

        Clicked: function(){
            if(!App.paused && !$(this).find(".inside").hasClass("matched") && !$(this).find(".inside").hasClass("picked")){
                $(this).find(".inside").addClass("picked");
                if(!App.guess){
                  click++;
                    $("#number").html("" + click);
                    App.guess = $(this).attr("data-id");
                } else if(App.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
                  click++;
                    $("#number").html("" + click);
                    $(".picked").addClass("matched");
                    App.guess = null;
                } else {
                  click++;
                    $("#number").html("" + click);
                    App.guess = null;
                    App.paused = true;
                    setTimeout(function(){
                        $(".picked").removeClass("picked");
                        App.paused = false;
                    }, 600);
                }

              //  if($(".matched").length == $(".card").length){
            //        App.win();
                //}
            }
        },

        win: function(){
          click =0;
            this.paused = true;
            setTimeout(function(){
                App.showModal();
                App.$(".game").fadeOut();
            }, 1000);
            $("#number").html("" + click);
        },

        lose: function(){
          click=0;
          this.paused = true;
          setTimeout(function(){
              App.showModal2();
              $(".game").fadeOut();
          }, 1000);
            $("#number").html("" + click);
        },

        showModal: function(){
            $(".modal-overlay").show();
            $(".modal").fadeIn("slow");
        },

        showModal2: function(){
          $(".modal-overlay2").show();
          $(".modal2").fadeIn("slow");
        },

        hideModal: function(){

            $(".modal-overlay").hide();
            $(".modal").hide();
            $(".modal-overlay2").hide();
            $(".modal2").hide();
            count = 60;
            $('#result').html(count);
        },

        reset: function(){
            this.hideModal();
            this.shuffleCards(this.cardsArray);
            this.setup();
            $(".game").show("slow");
        },

        buildHTML: function(){
            var page = '';
            this.$cards.each(function(k, v){
                page += '<div class="card" data-id="'+ v.id +'"><div class="inside"><div class="front"><img src="'+ v.img +'" /></div>\
				<div class="back"></div></div>\
				</div>';
            });
            return page;
        }
    };

    var cards = [
        {
            img: "images/naruto.png",
            id: 1
        },
        {
            img: "images/jiraya.png",
            id: 2
        },
        {
            img: "images/orachimaru.png",
            id: 3
        },
        {
            img: "images/sakura.png",
            id: 4
        },
        {
            img: "images/kakashi.png",
            id: 5
        },
        {
            img: "images/sasuke.png",
            id: 6
        },
        {
            img: "images/itachi.png",
            id: 7
        },
        {
            img: "images/gaara.png",
            id: 8
        }

    ];
    App.initialize(cards);


    $(".start").click(function(){
      var timer = setInterval(function() {

      var count = parseInt($('#result').html());
      if (count !== 0) {
        $('#result').html(count - 1);
      } else if(count == 0 && $(".matched").length != $(".card").length){
        clearInterval(timer);
        App.lose();
      }
      if(/*count !== 0 &&*/ $(".matched").length === $(".card").length){
        clearInterval(timer);
        App.win();
      }
    }, 1000);
  });

});
