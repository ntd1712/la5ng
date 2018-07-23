<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during authentication for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'failed' => 'These credentials do not match our records.',
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
    'identity_sender' => 'Support Team',
    'identity_subject' => 'Important - Password Reset Required',
    'identity_tpl' => <<<EOF
Hello :name,

You (or someone pretending to be you) requested that your password be reset.

If you didn't make this request then ignore the email; no changes have been made.

If you did make the request, then click <a href=":link">here</a> to reset your password.

Best regards,
Support Team
EOF
];
