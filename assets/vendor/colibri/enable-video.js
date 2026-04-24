jQuery( document ).ready( function( $ ) {
	
	setTimeout( function() {
		var videoData = jQuery( '.background-layer-media-container div[data-video]' ).data( 'fn.colibri.videoBackground' );
		
		if ( ! videoData ) {
			return false;
		}

		videoData.__proto__.start = function() { 
			this.videoData = {
				mimeType: this.opts.mimeType,
				poster: this.opts.poster,
				videoUrl: this.opts.video,
			};
		
			this.generateVideo();
		};

		videoData.start();
		videoData.updateVideoBackground();

		var handler, video;

		handler = videoData.handler;

		if ( handler.video ) {
			video = handler.video;
			
			video.setAttribute( 'autoplay', true );
			video.setAttribute( 'loop', true );
			video.setAttribute( 'muted', true );
			video.setAttribute( 'playsinline', true );
		}

		handler.onLoad( function() {
			videoData.$element.children( 'iframe, video' )
			.removeClass( 'h-hide-sm-force' )
			.css( 'visibility', 'visible' );
		} );

	}, 2000 );
} );