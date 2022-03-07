jQuery(function() {
  let nonDescriptText = [
    'read more',
    'learn more'
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
            NONDESCRIPTLINKSWPJS.addAriaLabel(link, childHeader);
            return false; // stop loop
          }
        });
      }
    }
  });
});


var NONDESCRIPTLINKSWPJS = {
  checkForChildHeader: function (element) {
    let header = null;

    jQuery(element).find('h1, h2, h3, h4, h5, h6').each(function(childHeaderIndex, childHeader) {
      if (jQuery(childHeader).text().trim() !== '') {
        header = childHeader;
        return false; // stop loop
      }
    });

    return header;
  },

  addAriaLabel: function (link, header) {
    let headerID = 'custom-descript-header-' + Date.now();
    if ( jQuery(header).hasAttr('id') ) {
      headerID = jQuery(header).hasAttr('id');
    }
    let linkID = 'custom-nondescript-link-' + Date.now();
    if ( jQuery(link).hasAttr('id') ) {
      linkID = jQuery(link).hasAttr('id');
    }
    jQuery(link).attr('aria-labelledby', linkID + ' ' + headerID);
  },
}
