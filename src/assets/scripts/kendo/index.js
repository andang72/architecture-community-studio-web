import * as $ from 'jquery';
import axios from 'axios';
import '@progress/kendo-ui';
import * as studioAPIs from '../studio/index'; 


export default (function () { 

    window.studio = studioAPIs.studio;    
    // checking authentication
    var authenticateRequired = document.getElementsByTagName('body')[0].getAttribute('authenticate-required');
    if(authenticateRequired && studioAPIs.studio.services.accounts.state.status.loggedIn) {
        studioAPIs.studio.services.accounts.verify();
    }    
    if(authenticateRequired && !studioAPIs.studio.services.accounts.state.status.loggedIn) {
        window.location.replace("signin.html");
    }

    // checing user avatar
    if( $('[data-profile-avatar]') && studioAPIs.studio.services.accounts.state.status.loggedIn ){
        $('[data-profile-avatar]').attr("src", studioAPIs.studio.services.accounts.getUserAvatarUrl() );
    }
    if( $('[data-profile-name]') && studioAPIs.studio.services.accounts.state.status.loggedIn ){
        $('[data-profile-name]').html( studioAPIs.studio.services.accounts.getCurrentUser().name );
    }
    
    // logout 
    $('a.logout').on("click", function(){
        studio.services.accounts.logout();
        location.reload(true);
    });

    $(function() {
        if (typeof setup === "function")
        {
            setup();
        }
    });

    window.addEventListener('load', () => {
    















        
        
    });  
}());


