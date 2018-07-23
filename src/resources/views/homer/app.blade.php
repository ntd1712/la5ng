{{--*/ $isProduction = 'production' === config('app.env'); /*--}}
<!doctype html>
<html lang="{{ $config['app.locale'] }}" ng-app="homer">
<head>
    <base href="{{ url('/themes/' . $config['app.theme']) . ($isProduction ? '/dist' : '/app') }}/"/>
    <meta charset="{{ $config['framework.charset'] }}"/>
    <meta http-equiv="x-ua-compatible" content="IE=edge,chrome=1"/>
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title page-title="{{ strip_tags($config['app.title']) }}"></title>
    <link rel="shortcut icon" type="image/ico" href="{{ url('/favicon.ico') }}"/>
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Montserrat:400,700|Dosis:400,500,600,700|EB+Garamond"/>
@if ($isProduction)
    <link rel="stylesheet" href="styles/vendor.098540d4.css"/>
    <link rel="stylesheet" href="styles/style.bee160f9.css"/>
@else
    <link rel="stylesheet" href="../node_modules/animate.css/animate.css"/>
    <link rel="stylesheet" href="../node_modules/font-awesome/css/font-awesome.css"/>
    <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css"/>
    <link rel="stylesheet" href="../node_modules/sweetalert2/dist/sweetalert2.css"/>
    <link rel="stylesheet" href="../node_modules/datatables.net-bs/css/dataTables.bootstrap.css"/>
    <link rel="stylesheet" href="../node_modules/noty/lib/noty.css"/>
    <link rel="stylesheet" href="styles/style.css"/>
    <link rel="stylesheet" href="styles/custom.css"/>
@endif
</head>
<body class="@{{ $state.current.data.specialClass }}" backdrop="true" ng-strict-di>
    <!--[if lt IE 7]>
    <p class="alert alert-danger">You are using an <strong>outdated</strong> browser.
        Please <a href="http://browsehappy.com">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    <div ui-view autoscroll="true"></div>
@if ($isProduction)
    <script src="scripts/vendor.cdd8522a.js"></script>
@else
    <script src="../node_modules/lockr/lockr.js"></script>
    <script src="../node_modules/lodash/lodash.js"></script>
    <script src="../node_modules/moment/moment.js"></script>
    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script src="../node_modules/bootstrap/dist/js/bootstrap.js"></script>
    <script src="../node_modules/sweetalert2/dist/sweetalert2.js"></script>
    <script src="../node_modules/datatables.net/js/jquery.dataTables.js"></script>
    <script src="../node_modules/datatables.net-plugins/api/fnSetFilteringDelay.js"></script>
    <script src="../node_modules/datatables.net-bs/js/dataTables.bootstrap.js"></script>
    <script src="../node_modules/metismenu/dist/metisMenu.js"></script>
    <script src="../node_modules/noty/lib/noty.js"></script>
    <script src="../node_modules/angular/angular.js"></script>
    <script src="../node_modules/angular-sanitize/angular-sanitize.js"></script>
    <script src="../node_modules/@uirouter/angularjs/release/angular-ui-router.js"></script>
    <script src="../node_modules/angular-datatables/dist/angular-datatables.js"></script>
    <script src="../node_modules/angular-jwt/dist/angular-jwt.js"></script>
    <script src="../node_modules/angular-translate/dist/angular-translate.js"></script>
    <script src="../node_modules/angular-translate-loader-partial/angular-translate-loader-partial.js"></script>
    <script src="../node_modules/oclazyload/dist/ocLazyLoad.js"></script>
@endif
    <script>/*<![CDATA[*/
window.CFG = {!! json_encode(['app' => $config['app'], 'session' => $config['session'], 'urls' => $config['urls']]) !!};
    /*]]>*/</script>
@if ($isProduction)
    <script src="scripts/scripts.0c708101.js"></script>
@else
    <script src="scripts/theme.js"></script>
    <script src="scripts/app.js"></script>
    <script src="scripts/config.js"></script>
    <script src="scripts/bundle.js"></script>
    <script src="scripts/common/directives/directives.js"></script>
    <script src="scripts/common/factories/abstract.model.js"></script>
    <script src="scripts/common/factories/abstract.repository.js"></script>
    <script src="scripts/common/factories/abstract.controller.js"></script>
    <script src="scripts/common/providers/request.provider.js"></script>
    <script src="scripts/system/auth/login.model.js"></script>
    <script src="scripts/system/auth/login.repository.js"></script>
    <script src="scripts/system/auth/login.controller.js"></script>
    <script src="scripts/system/auth/login.route.js"></script>
    <script src="scripts/system/audit/audit.route.js"></script>
    <script src="scripts/system/lookup/lookup.route.js"></script>
    <script src="scripts/system/setting/setting.route.js"></script>
    <script src="scripts/account/permission/permission.route.js"></script>
    <script src="scripts/account/role/role.route.js"></script>
    <script src="scripts/account/user/user.route.js"></script>
@endif
</body>
</html><!-- developed by ntd1712 -->
