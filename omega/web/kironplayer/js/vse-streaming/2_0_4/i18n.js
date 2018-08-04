/*
/*	This file contains the translation of the messages issued by the streaming player.
/*
/*	The messages are presented as pair "name" : "value", you can modify the "value" but not the "name".
/*	You can add new languages  by replicating the structure and assigning a new language code.
/*	Accents or symbols should be encoded into HTML entities.
/*
/*	This file is UTF-8 encoded. 
*/
window.streaming_vse_i18n =
{	
	"en-en" : {
		// Player messages
		"internal_error": "Failure: an internal error has occurred",
		"connecting": "Connecting...",
		"browser_not_compatible": "Your browser is not compatible with the video streaming formats",
		"unexpected_response_server": "Unexpected response of the server",
        "flash_player_error": "You need a flash player version higher than 11.",
		
		// Server messages
		"stream_disabled": "Access to streaming denied, the stream is disabled",
		"no_active_account": "Access to the streaming denied, there is no active stream associated to the account",
		"auth_parameter_missing": "Access to the streaming denied, Auth parameter is missing",
		"no_active_servers": "Access to streaming denied, no active servers found",
		"no_stream_associated": "There is no stream associated to the customer account",
		
		// Maintenance
		"server_maintenance": "The server is on maintenance from ",
		"to": " to "
	},
	
	"fr-fr" : {
		// Player messages
		"internal_error": "Une erreur interne s'est produite.",
		"connecting": "Connexion...",
		"browser_not_compatible": "Votre navigateur n'est pas compatible avec les formats de streaming video disponibles.",
		"unexpected_response_server": "R&ecute;ponse insnesp&ecute;r&ecute;e du serveur",
        "flash_player_error": "You need a flash player version higher than 11.",

		// Server messages
		"stream_disabled": "L&apos;acc&egrave;s &agrave; la video n&apos;est pas authoris&eacute;, le flux est d&eacute;sactiv&eacute;.",
		"no_active_account": "Acc&#xE8;s au streaming refus&#xE9;, il n&#x27;y a pas de stream actif associ&#xE9; au compte.",
		"auth_parameter_missing": "Acc&#xE8;s au streaming refus&#xE9;, erreur d'identifiction du compte.",
		"no_active_servers": "Acc&#xE8;s au streaming refus&#xE9;, il n'y pas de serveurs actifs.",
		"no_stream_associated": "Acc&#xE8;s au streaming refus&#xE9;, il n&#x27;y a pas de flux associ&#xE9; au compte.",

		// Maintenance
		"server_maintenance": "Le serveur est en pause pour maintenance entre ",
		"to": " et "		
	},
	
	"es-es" : {
		// Player messages
		"internal_error": "Se ha producido un error interno",
		"connecting": "Conectando...",
		"browser_not_compatible": "Tu navegador no es compatible con los formatos de flujo de video disponibles",
		"unexpected_response_server": "Respuesta inesperada del servidor",
        "flash_player_error": "Necesitas una versi&oacute;n de flash player superior a 11.",
		
		// Server messages
		"stream_disabled": "Acceso al flujo denegado, el flujo se ha desactivado",
		"no_active_account": "Acceso al flujo denegado, no hay una cuenta activa asociada al cliente",
		"auth_parameter_missing": "Acceso al flujo denegado, falta el par&aacute;metro de autenticaci&oacute;n",
		"no_active_servers": "Acceso al flujo denegado, no se encontraron servidores activos",
		"no_stream_associated": "No hay un flujo asociado a la cuenta de cliente",
		
		// Maintenance
		"server_maintenance": "El servidor est&aacute; en mantenimiento de ",
		"to": " a "
	}
};
