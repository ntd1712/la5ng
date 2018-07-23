'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    // Grunt configuration
    grunt.initConfig({

        // Project settings
        theme: appConfig,

        // The grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/node_modules',
                                connect.static('./node_modules')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= theme.dist %>'
                }
            }
        },
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    '<%= theme.app %>/styles/style.css': '<%= theme.app %>/styles/less/style.less'
                }
            }
        },
        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['<%= theme.app %>/styles/less/*.less'],
                tasks: ['less', 'copy:styles'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            js: {
                files: ['<%= theme.app %>/scripts/{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= theme.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= theme.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        uglify: {
            options: {
                mangle: false
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= theme.dist %>/{,*/}*',
                        '!<%= theme.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= theme.app %>',
                        dest: '<%= theme.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/**/*.html',
                            'styles/report.css',
                            'styles/img/*.*',
                            'images/**/*.*',
                            'icons/**/*.*',
                            'fonts/{,*/}*.*',
                            'l10n/{,*/}*.*'
                        ]
                    },{
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/font-awesome',
                        src: ['fonts/*.*'],
                        dest: '<%= theme.dist %>'
                    },{
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/material-design-iconic-font/dist',
                        src: ['fonts/*.*'],
                        dest: '<%= theme.dist %>'
                    },{
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/pixeden-stroke-7-icon/pe-icon-7-stroke',
                        src: ['fonts/*.*'],
                        dest: '<%= theme.dist %>'
                    },{
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: '<%= theme.dist %>'
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= theme.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= theme.dist %>/scripts/{,*/}*.js',
                    '<%= theme.dist %>/styles/{,*/}*.css',
                    '!<%= theme.dist %>/styles/report.css',
                    '<%= theme.dist %>/styles/fonts/*'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= theme.dist %>',
                    src: ['*.html', 'views/**/*.html'],
                    dest: '<%= theme.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: '<%= theme.app %>/index.html',
            options: {
                dest: '<%= theme.dist %>'
            }
        },
        usemin: {
            html: ['<%= theme.dist %>/index.html']
        }
    });

    grunt.registerTask('live', [
        'clean:server',
        'copy:styles',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('server', [
        'build',
        'connect:dist:keepalive'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'less',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
};