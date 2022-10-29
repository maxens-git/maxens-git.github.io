<?php
use SKien\PNServer\PNVapid;

function getMyVapid()
{
    /**
	 * set the generated VAPID key and rename to MyVapid.php
	 *
	 * you can generate your own VAPID key on https://tools.reactpwa.com/vapid.
	 */
     $oVapid = new PNVapid(
     "mailto:maxens.verron@outlook.com",
     "BPAeLrRNqZrrBB7iq_xX8EJYL_rNucSKCz9cKMLY6QBVr91N6Anlk2388Fslx0jt6sQhNrdSk_NWVlcc4lXd7cU",
     "-P-U0Suk92ZuEJe3gRS82eT49dcSkumRl2HTK3BRUko"
     );
    return $oVapid;    
}