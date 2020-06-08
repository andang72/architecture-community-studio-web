import * as $ from 'jquery';
import axios from 'axios';
import '@progress/kendo-ui';
import * as studioAPIs from '../studio/index'; 

export default (function () { 
    window.studio = studioAPIs.studio;
    
    // checking authentication
    var authenticateRequired = document.getElementsByTagName('body')[0].getAttribute('authenticate-required');
    if(authenticateRequired && !studioAPIs.studio.services.accounts.state.status.loggedIn) {
        window.location.replace("signin.html");
    }

    if( $('[data-profile-avatar]') && studioAPIs.studio.services.accounts.state.status.loggedIn ){
        $('[data-profile-avatar]').attr("src", studioAPIs.studio.services.accounts.getUserAvatarUrl() );
    }
    if( $('[data-profile-name]') && studioAPIs.studio.services.accounts.state.status.loggedIn ){
        $('[data-profile-name]').html( studioAPIs.studio.services.accounts.getCurrentUser().name );
    } 

    $(function() {
        if (typeof setup === "function")
        {
            setup();
        }
    });

    window.addEventListener('load', () => {
        
    });  
}());


