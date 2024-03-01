var objArr = [];
var svMArr = [];
var objCount = 0;
var svCount = 0;
var delayTime = 3000;
var crrSv = null;
var crrMenu = null;
var intro = null;
var section = null;
var mnArr = [];
var mainMn;
var isInit = false;
var modal = null;
var header = $('header');

var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene, {
    relativeInput: true,
    pointerEvents: true
});

var runIntro = function() {
    intro = $('#intro');
    // time to fly-out
    setTimeout(function() {
  
        // intro effect
        intro.delay(700).animate({ opacity: '0', marginTop: '0%' }, 800, function() {
            // hide intro
            $(this).hide();

            // init main page
            initPage();
        });
    }, 3000);
};

var initPage = function() {
    //for testing
    countObj();
    initObj();
    // initMainMenu();
    setTimeout(runEffect, 1000);

    // $('.btnFile').bind('click', function(e) {

    //     var obj = $(this);
    //     var file = obj.data('file');
    //     var svSection = obj.data('section');

    //     //show modal
    //     if (file != undefined && file != '') {
    //         if (file == 'home') {
    //             hideModal();
    //             hideMainMn();
    //         } else {
    //             openModal(file, svSection);
    //         }
    //     }
    // })
};

// var initMainMenu = function() {
//     mainMn = $('#mainMn');

//     mainMn.find('li').each(function() {
//         var obj = $(this);
//         mnArr.push(obj);
//     });

//     $('.mainMnBtn').bind('click', function() {
//         //show modal
//         mainMn.css({ display: 'block', opacity: 0, marginTop: '10%' });
//         mainMn.animate({ opacity: 1, marginTop: '0%' }, 200);

//         mainMn.find('li').css({ marginTop: '20px', fontSize: '2em', opacity: 0 });
//         for (var i = 0; i < mnArr.length; i++) {
//             mnArr[i].delay(i * 50 + 100).animate({ marginTop: '0px', fontSize: '1.6em', opacity: 1 }, 160, 'linear');
//         }
//     });

//     mainMn.find('.close').bind('click', hideMainMn);
// };

var hideMainMn = function() {
    //hide menui
    mainMn.animate({ opacity: 0, marginTop: '10%' }, 200, function() {
        mainMn.hide();
    });
};

var countObj = function() {
    $('#prlx').find('.people').each(function() {
        var obj = $(this);
        objArr.push(obj);
    });
    //console.log(objArr.length);
};

var initObj = function() {
    for (var i = 0; i < objArr.length; i++) {
        var obj = objArr[i];

        obj.find('.body').css({ opacity: 0, marginTop: -100 });
        obj.find('.body').delay(100 * i).animate({
            opacity: 1,
            marginTop: 0
        }, 900, 'easeInOutElastic', function() {
            // Animation complete.
        });
    }

};

var runEffect = function() {
    var obj = objArr[objCount];

    obj.addClass('active');
    obj.find('.effect').show();

    setTimeout(function() {
        obj.find('.typewriter').addClass('active');
    }, delayTime / 4);

    setTimeout(function() {
        if (!obj.find('.pop').hasClass('active')) {
            obj.find('.pop').addClass('active');
        }
    }, delayTime / 5);

    setTimeout(function() {
        obj.removeClass('active');

        //hide current obj
        obj.find('.effect').hide();

        obj.find('.typewriter').removeClass('active');

        //count item
        objCount++;
        if (objCount >= objArr.length)
            objCount = 0;

        //run next obj effect
        runEffect();

    }, delayTime)
};


var openModal = function(file, svSection) {
    modal = $('.modal');
    section = svSection;

    console.log(crrSv);

    mainMn.hide();
    modal.hide();

    $('#svModal .data-ctn').html('');


    $('#svModal .data-ctn').load(file, function(response, status, xhr) {
        if (status == "error") {
            console.log(xhr.status + " " + xhr.statusText);
        } else {

            header.addClass('transparent');

            //show modal
            modal.css({ display: 'block', opacity: 0, marginTop: '10%' });
            modal.animate({ opacity: 1, marginTop: '0%' }, 200);

            initSvAni();

            modal.find('.data-ctn .btnFile').bind('click', function(e) {
                var obj = $(this);
                var file = obj.data('file');
                var svSection = obj.data('section');

                //show modal
                if (file != undefined && file != '') {
                    openModal(file, svSection);
                }
            });

            //hide modal handle
            modal.find('.close').click(hideModal);

        }

    });

};

var hideModal = function() {
    header.removeClass('transparent');
    modal.animate({ opacity: 0, marginTop: '10%' }, 200, function() {
        modal.hide();
        $('#svModal .data-ctn').html('');
    });
};

var initSvAni = function() {

    // console.log('init page');
    //clear cached data
    svMArr = [];
    crrSv = null;
    crrMenu = null;

    //bind function to menu
    $('.svMenu .item').find('a').each(function(e) {
        var menu = $(this);

        menu.bind('click', function() {
            var target = menu.data('target');

            //run animation
            if (crrMenu != menu) {
                console.log('diff');
                runSvAni(target);

                //clear current menu
                if (crrMenu != null)
                    crrMenu.removeClass('active');

                //assign current menu
                menu.addClass('active');
                crrMenu = menu;
            }
        });

        //push to arrray
        svMArr.push(menu);
    });

    if (svMArr.length > 0) {
        // run fist child
        var startMenu;

        //console.log("section:" + section);
        if (section != null && section != undefined && section != "") {
            startMenu = $(section);
        } else {
            startMenu = svMArr[0];
        }

        var target = startMenu.data('target');

        runSvAni(target);
        startMenu.addClass('active');
        crrMenu = startMenu;
        //console.log(target)
    } else {
        var id = modal.find('.svItem').attr('id');
        console.log(id);
        if (id != undefined && id != "") {
            runSvAni('#' + id);
        }
    }

    // runSvEffAuto();
};

var runSvAni = function(service, forceStart) {
    // console.log('animation');
    var delay = 400;
    var aniDu = 1000;
    var forceTime = 0;

    if (forceStart == true)
        forceTime = 360;

    //hide current service
    if (crrSv != null)
        hideSv(crrSv);

    $(service).show();
    $(service).find('.title').css({ opacity: 0, marginTop: '60px' });
    $(service).find('.desc').css({ opacity: 0, marginTop: '60px' });
    $(service).find('.illus').css({ opacity: 0, marginTop: '-6%' });

    $(service).find('.illus').delay(delay - forceTime).animate({ opacity: 1, marginTop: '-3%' }, aniDu, 'easeOutElastic');
    $(service).find('.title').delay(delay * 2 - forceTime).animate({ opacity: 1, marginTop: '0px' }, aniDu, 'easeOutElastic');
    $(service).find('.desc').delay(delay * 3 - forceTime).animate({ opacity: 1, marginTop: '0px' }, aniDu, 'easeOutElastic');

    //log current service
    crrSv = service
};

var hideSv = function(service) {
    var aniDu = 400;

    $(service).animate({ opacity: 0, marginTop: '-60px' }, aniDu, function() {
        $(service).css({ opacity: 1, marginTop: ' 0px' });
        $(service).hide();
    });
};

var runSvEffAuto = function() {
    var svMItem = svMArr[svCount];

    setTimeout(function() {

        // content
        var target = svMItem.data('target');
        runSvAni(target);

        //clear current menu
        if (crrMenu != null)
            crrMenu.removeClass('active');

        //menu
        svMItem.addClass('active');

        //assign current menu
        crrMenu = svMItem;

        //count item
        svCount++;
        if (svCount >= svMArr.length)
            svCount = 0;

        //run next obj effect
        runSvEffAuto();

    }, delayTime)
};