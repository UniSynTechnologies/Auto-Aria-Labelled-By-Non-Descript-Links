jQuery(function() {
  let nonDescriptText = [
    'read more',
    'learn more',
    'click here to learn more',
  ];

  jQuery('a').each(function(linkIndex, link) {
    let linkText = jQuery(link).text();
    if (typeof linkText === 'string') {
      linkText = linkText.trim().toLowerCase();
      if (nonDescriptText.indexOf(linkText) !== -1) {
        // so this link has non-descript text and as such lets try to find a header to describe it further
        jQuery(link).parents("*").each(function(parentElementIndex, parentElement) {
          let childHeader = NONDESCRIPTLINKSWPJS.checkForChildHeader(parentElement);
          if (childHeader !== null) {
            NONDESCRIPTLINKSWPJS.addAriaLabel(link, childHeader, linkIndex);
            return false; // stop loop
          }
        });
      }
    }
  });
});


const NONDESCRIPTLINKSWPJS = {
  checkForChildHeader: function (element) {
    let header = null;

    jQuery(element).find('h1, h2, h3, h4, h5, h6').each( (childHeaderIndex, childHeader) => {
      if (jQuery(childHeader).text().trim() !== '') {
        header = childHeader;
        return false; // stop loop
      }
    });

    return header;
  },

  addAriaLabel: function (link, header, linkIndex) {
    let headerID = 'custom-descript-header-' + Date.now() + linkIndex;
    if ( jQuery(header).attr('id') ) {
      headerID = jQuery(header).attr('id');
    }
    else {
      jQuery(header).attr('id', headerID); // didn't have an id so add one
    }
    let linkID = 'custom-nondescript-link-' + Date.now() + linkIndex;
    if ( jQuery(link).attr('id') ) {
      linkID = jQuery(link).attr('id');
    }
    else {
      jQuery(link).attr('id', linkID); // didn't have an id so add one
    }
    jQuery(link).attr('aria-labelledby', linkID + ' ' + headerID);
  },
}
