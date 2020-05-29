var NAME = "Juan ";
var SURNAME = "Martinez Alonso "

function openDir(path,command) {
    auxDir = root;
    var tempPath = path;
    if ( tempPath.startsWith('~'))
        tempPath = tempPath.replace("~","/home/anonymous");
    if ( !tempPath.startsWith('/')) {
        tempPath = file['options']['dir']+file['options']['name']+'/'+tempPath;
    }

    var finalPath = [];
    var auxPath = tempPath.split('/');

    for ( let i = 0; i < auxPath.length; i++ ) {
        if ( auxPath[i] == 'options' ) {
            if ( command != '' )
                newLine((command+": can not access '"+path+"': not exist").replace(/ /g,'\xa0'));
            return null;
        } else if ( auxPath[i] == '..') {
            if (finalPath.length > 0)
                finalPath.pop();
        } else {
            if ( auxPath[i] != '' && auxPath[i] != '.' )
                finalPath.push(auxPath[i]);
        }
    }

    for ( let i = 0; i < finalPath.length; i++ ) {
        if ( Object.keys(auxDir).includes(finalPath[i]) ) {
            if ( auxDir[finalPath[i]]['options']['allow'] == 0 ) {
                if ( command != '' )
                    newLine((command+": can not access '"+path+"': not allow").replace(/ /g,'\xa0'));
                return null;
            }
            auxDir = auxDir[finalPath[i]];
        } else {
            if ( command != '' )
                newLine((command+": can not access '"+path+"': not exist").replace(/ /g,'\xa0'));
            return null;
        }
    }

    return auxDir;
}

function path_change_recursive(dirs,dir,name){
    dirs['options']['dir'] = dir;
    dirs['options']['name'] = name;
    dirs['options']['path'] = (dir+name+"/").replace(/\/home\/anonymous\//g,"");
    var subFiles = Object.keys(dirs);
    for ( let i = 0; i < subFiles.length; i++ ) {
        if ( !WLIST_SYSNAME.includes(subFiles[i]) ) {
            path_change_recursive(dirs[subFiles[i]],dir+name+"/",subFiles[i]);
        }
    }
}

var root = {
    'options': {
        'dir': '',
        'name': '',
        'path': '/',
        'type': 'folder',
        'allow': 1,
        'edit': 0,
    },
    '.': { 'options': { 'type': 'system', }, },
    '..': { 'options': { 'type': 'system', }, },
    'boot': {
        'options': {
            'dir': '/',
            'name': 'boot',
            'path': '/boot/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
    'dev': {
        'options': {
            'dir': '/',
            'name': 'dev',
            'path': '/dev/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
    'etc': {
        'options': {
            'dir': '/',
            'name': 'etc',
            'path': '/etc/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
    'home': {
        'options': {
            'dir': '/',
            'name': 'home',
            'path': '/home/',
            'type': 'folder',
            'allow': 1,
            'edit': 0,
        },
        '.': { 'options': { 'type': 'system', }, },
        '..': { 'options': { 'type': 'system', }, },
        'anonymous': {
            'options': {
                'dir': '/home/',
                'name': 'anonymous',
                'path': '~',
                'type': 'folder',
                'allow': 1,
                'edit': 0,
            },
            '.': { 'options': { 'type': 'system', }, },
            '..': { 'options': { 'type': 'system', }, },
            'README.txt': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': 'README.txt',
                    'type': 'doc',
                    'allow': 1,
                    'edit': 0,
                    'content': [
                        " ",
                        "    Welcome to my website, here you can find",
                        "    personal information and how to contact me.",
                        "    You can also find information about my",
                        "    personal projects that I have developed.",
                        " ",
                    ]
                }
            },
            'profile.git': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': 'profile.git',
                    'type': 'opengit',
                    'url': 'https://github.com/jonsomarlo',
                    'allow': 1,
                    'edit': 0,
                }
            },
            'profile.in': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': 'profile.in',
                    'type': 'openlinked',
                    'url': 'https://www.linkedin.com/in/juan-martinez-41a4261a9/',
                    'allow': 1,
                    'edit': 0,
                }
            },
            'others': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': 'others',
                    'path': 'others/',
                    'type': 'folder',
                    'allow': 1,
                    'edit': 1,
                },
                '.': { 'options': { 'type': 'system', }, },
                '..': { 'options': { 'type': 'system', }, },
                // 'file.txt': {
                //     'options': {
                //         'dir': '/home/anonymous/others/',
                //         'name': 'file.txt',
                //         'type': 'doc',
                //         'allow': 1,
                //         'edit': 0,
                //         'content': [
                //             " ",
                //         ]
                //     }
                // },
            },
            'curriculum': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': 'curriculum',
                    'path': 'curriculum/',
                    'type': 'folder',
                    'allow': 1,
                    'edit': 0,
                },
                '.': { 'options': { 'type': 'system', }, },
                '..': { 'options': { 'type': 'system', }, },
                'curriculum_es.pdf': {
                    'options': {
                        'dir': '/home/anonymous/curriculum/',
                        'name': 'curriculum_es.pdf',
                        'type': 'open',
                        'url': 'anonymous/curriculum/curriculum_es.pdf',
                        'allow': 1,
                        'edit': 0,
                    }
                },
                'curriculum_en.pdf': {
                    'options': {
                        'dir': '/home/anonymous/curriculum/',
                        'name': 'curriculum_en.pdf',
                        'type': 'open',
                        'url': 'anonymous/curriculum/curriculum_en.pdf',
                        'allow': 1,
                        'edit': 0,
                    }
                },
                'en_US': {
                    'options': {
                        'dir': '/home/anonymous/curriculum/',
                        'name': 'en_US',
                        'path': 'curriculum/en_US/',
                        'type': 'folder',
                        'allow': 1,
                        'edit': 0,
                    },
                    '.': { 'options': { 'type': 'system', }, },
                    '..': { 'options': { 'type': 'system', }, },
                    'academic.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/en_US/',
                            'name': 'academic.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= ACADEMIC ============================== EN =",
                                "    · UNIVERSITY DEGREE AT COMPUTER SCIENCE:",
                                "       [2016-present]",
                                "       At Universidad Autónoma de Madrid",
                                "       (UAM), Madrid, Madrid (Spain).",
                                " ",
                                "    · PRE-UNIVERSITY (BACHILLERATO)",
                                "       [2014-2016]",
                                "       At IES Jorge Manrique, Tres Cantos,",
                                "       Madrid (Spain).",
                                " ",
                            ]
                        }
                    },
                    'contact.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/en_US/',
                            'name': 'contact.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= CONTACT =============================== EN =",
                                "      name: "+NAME,
                                "   surname: "+SURNAME,
                                " ",
                                "      mail: juan.martinez.alons@gmail.com",
                                "    mobile: +34 676 65 99 00",
                                "  location: 28769, Tres Cantos, Madrid (Spain)",
                                " ",
                            ]
                        }
                    },
                    'experience.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/en_US/',
                            'name': 'experience.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= EXPERIENCE ============================ EN =",
                                "    · VOLUNTEER WITH MECHANEKO ASSOCIATION:",
                                "       [2018-2020]",
                                "       Event organization at Ifema (Madrid).",
                                "       Assistance to visitors, coordination",
                                "       of tasks.",
                                " ",
                            ]
                        }
                    },
                    'languages.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/en_US/',
                            'name': 'languages.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= LANGUAGES ============================= EN =",
                                "  Spanish: Native",
                                "  English: Intermediate (B2)",
                                " ",
                            ]
                        }
                    },
                    'personal.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/en_US/',
                            'name': 'personal.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= PERSONAL PROFILE ====================== EN =",
                                "  I am an honest and ethically committed",
                                "  person, with a high capacity for learning",
                                "  and adaptation to change. Accustomed to",
                                "  teamwork and problem analysis and solving.",
                                " ",
                                "  Desiring to obtain a position in your",
                                "  company, where I can learn and continue to",
                                "  develop myself, where I can apply my",
                                "  knowledge and experience, that offers me",
                                "  the opportunity to overcome all my goals",
                                "  and set new ones.",
                                " ",
                            ]
                        }
                    },
                    'programming.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/en_US/',
                            'name': 'programming.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= PROGRAMMING =========================== EN =",
                                "---------------------------------- LANGUAGES -",
                                "    Python        SQL        Java",
                                "    C             HTML5       CSS",
                                "    JavaScript    PHP         LISP",
                                "    Prolog        VHDL        ASM",
                                " ",
                                "--------------------------------------- IDEs -",
                                "    NetBeans      Eclipse     ",
                                " ",
                                "------------------------------------- OTHERS -",
                                "    Experience with Flask for Web Proyects",
                                "    Experience with GIT repositories",
                                " ",
                            ]
                        }
                    }
                },
                'es_ES': {
                    'options': {
                        'dir': '/home/anonymous/curriculum/',
                        'name': 'es_ES',
                        'path': 'curriculum/es_ES/',
                        'type': 'folder',
                        'allow': 1,
                        'edit': 0,
                    },
                    '.': { 'options': { 'type': 'system', }, },
                    '..': { 'options': { 'type': 'system', }, },
                    'estudios.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/es_ES/',
                            'name': 'estudios.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= ESTUDIOS ============================== ES =",
                                "    · GRADO EN INGENIERÍA INFORMÁTICA:",
                                "       [2016-now]",
                                "       En Universidad Autónoma de Madrid",
                                "       (UAM), Madrid, Madrid (Spain).",
                                " ",
                                "    · BACHILLERATO",
                                "       [2014-2016]",
                                "       En IES Jorge Manrique, Tres Cantos,",
                                "       Madrid (Spain).",
                                " ",
                            ]
                        }
                    },
                    'contacto.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/es_ES/',
                            'name': 'contacto.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= CONTACTO ============================== ES =",
                                "    nombre: "+NAME,
                                " apellidos: "+SURNAME,
                                " ",
                                "      mail: juan.martinez.alons@gmail.com",
                                "     movil: +34 676 65 99 00",
                                " dirección: 28769, Tres Cantos, Madrid (Spain)",
                                " ",
                            ]
                        }
                    },
                    'experiencia.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/es_ES/',
                            'name': 'experiencia.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= EXPERIENCIA =========================== ES =",
                                "    · VOLUNTARIO CON ASOCIACIÓN MECHANEKO:",
                                "       [2018-2020]",
                                "       Organizacion de eventos enIfema",
                                "       (Madrid). Asistencia a visitantes,",
                                "       coordinacion de tareas.",
                                " ",
                            ]
                        }
                    },
                    'idiomas.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/es_ES/',
                            'name': 'idiomas.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= IDIOMAS =============================== ES =",
                                "  Spanish: Nativo",
                                "  English: Intermedio (B2)",
                                " ",
                            ]
                        }
                    },
                    'personal.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/es_ES/',
                            'name': 'personal.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= PERFIL PERSONAL ======================= ES =",
                                "  Soy una persona honesta y de compromiso",
                                "  ético, con alta capacidad de aprendizaje",
                                "  y adaptación al cambio. Acostumbrado a",
                                "  trabajar en equipo y al análisis y",
                                "  resolución de problemas.",
                                " ",
                                "  Deseando obtener un puesto en la empresa,",
                                "  donde poder formarme y seguir desarrollán-",
                                "  dome personal y profesionalmente, donde",
                                "  aplicar mis experiencias y conocimientos,",
                                "  que me ofrezca la oportunidad de superar",
                                "  todas mis metas y fijar nuevas.",
                                " ",
                            ]
                        }
                    },
                    'programacion.txt': {
                        'options': {
                            'dir': '/home/anonymous/curriculum/es_ES/',
                            'name': 'programacion.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= PROGRAMACIÓN ========================== ES =",
                                "---------------------------------- LENGUAJES -",
                                "    Python        SQL        Java",
                                "    C             HTML5       CSS",
                                "    JavaScript    PHP         LISP",
                                "    Prolog        VHDL        ASM",
                                " ",
                                "--------------------------------------- IDEs -",
                                "    NetBeans      Eclipse     ",
                                " ",
                                "-------------------------------------- OTROS -",
                                "    Experiencia con Flask para Proyectos Web",
                                "    Experiencia con repositorios GIT",
                                " ",
                            ]
                        }
                    }
                },
            },
            '.bash_history': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': '.bash_history',
                    'type': 'doc',
                    'allow': 0,
                    'edit': 0,
                },
            },
            '.bash_logout': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': '.bash_logout',
                    'type': 'doc',
                    'allow': 0,
                    'edit': 0,
                },
            },
            '.bash_profile': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': '.bash_profile',
                    'type': 'doc',
                    'allow': 0,
                    'edit': 0,
                },
            },
            '.bashrc': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': '.bashrc',
                    'type': 'doc',
                    'allow': 0,
                    'edit': 0,
                },
            },
            '.cache': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': '.cache',
                    'path': '.cache/',
                    'type': 'folder',
                    'allow': 0,
                    'edit': 0,
                },
                '.': { 'options': { 'type': 'system', }, },
                '..': { 'options': { 'type': 'system', }, },
            },
            '.config': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': '.config',
                    'path': '.config/',
                    'type': 'folder',
                    'allow': 0,
                    'edit': 0,
                },
                '.': { 'options': { 'type': 'system', }, },
                '..': { 'options': { 'type': 'system', }, },
            },
            '.local': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': '.local',
                    'path': '.local/',
                    'type': 'folder',
                    'allow': 0,
                    'edit': 0,
                },
                '.': { 'options': { 'type': 'system', }, },
                '..': { 'options': { 'type': 'system', }, },
            },
            'projects': {
                'options': {
                    'dir': '/home/anonymous/',
                    'name': 'projects',
                    'path': 'projects/',
                    'type': 'folder',
                    'allow': 1,
                    'edit': 0,
                },
                '.': { 'options': { 'type': 'system', }, },
                '..': { 'options': { 'type': 'system', }, },
                'logo': {
                    'options': {
                        'dir': '/home/anonymous/projects/',
                        'name': 'logo',
                        'path': 'pojects/logo/',
                        'type': 'folder',
                        'allow': 1,
                        'edit': 0,
                    },
                    '.': { 'options': { 'type': 'system', }, },
                    '..': { 'options': { 'type': 'system', }, },
                    'logo-black.png': {
                        'options': {
                            'dir': '/home/anonymous/projects/logo/',
                            'name': 'logo-black.png',
                            'type': 'open',
                            'url': 'anonymous/projects/logo/logo-black.png',
                            'allow': 1,
                            'edit': 0,
                        },
                    },
                    'logo-white.png': {
                        'options': {
                            'dir': '/home/anonymous/projects/logo/',
                            'name': 'logo-white.png',
                            'type': 'open',
                            'url': 'anonymous/projects/logo/logo-white.png',
                            'allow': 1,
                            'edit': 0,
                        },
                    },
                    'project.INFO': {
                        'options': {
                            'dir': '/home/anonymous/projects/javascript_term/',
                            'name': 'project.INFO',
                            'type': 'infodoc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= PROYECTO: LOGO =============================",
                                "----------------------------------------------",
                                " author: "+NAME+SURNAME,
                                "  start: 06/2019",
                                "    end: 06/2019",
                                "    lan: -",
                                "----------------------------------------------",
                                " Description:",
                                "    Personal Logo.",
                                "----------------------------------------------",
                                " ",
                            ]
                        },
                    },
                },
                // 'none': {
                //     'options': {
                //         'dir': '/home/anonymous/projects/',
                //         'name': 'none',
                //         'path': 'pojects/none/',
                //         'type': 'folder',
                //         'allow': 1,
                //         'edit': 0,
                //     },
                //     '.': { 'options': { 'type': 'system', }, },
                //     '..': { 'options': { 'type': 'system', }, },
                //     'project.INFO': {
                //         'options': {
                //             'dir': '/home/anonymous/projects/javascript_term/',
                //             'name': 'project.INFO',
                //             'type': 'infodoc',
                //             'allow': 1,
                //             'edit': 0,
                //             'content': [
                //                 "= PROYECTO: ---- =============================",
                //                 "----------------------------------------------",
                //                 " author: "+NAME+SURNAME,
                //                 "  start: --/----",
                //                 "    end: --/----",
                //                 "    lan: -",
                //                 "----------------------------------------------",
                //                 " Description: EN",
                //                 "    ---",
                //                 " ",
                //                 " Descripcion: ES",
                //                 "    ---",
                //                 "----------------------------------------------",
                //                 " ",
                //             ]
                //         },
                //     },
                // },
                'javascript_term': {
                    'options': {
                        'dir': '/home/anonymous/projects/',
                        'name': 'javascript_term',
                        'path': 'pojects/javascript_term/',
                        'type': 'folder',
                        'allow': 1,
                        'edit': 0,
                    },
                    '.': { 'options': { 'type': 'system', }, },
                    '..': { 'options': { 'type': 'system', }, },
                    '.git': {
                        'options': {
                            'dir': '/home/anonymous/projects/javascript_term/',
                            'name': '.git',
                            'type': 'doc',
                            'allow': 0,
                            'edit': 0,
                        },
                    },
                    '.gitignore': {
                        'options': {
                            'dir': '/home/anonymous/projects/javascript_term/',
                            'name': '.gitignore',
                            'type': 'doc',
                            'allow': 0,
                            'edit': 0,
                        },
                    },
                    'README.txt': {
                        'options': {
                            'dir': '/home/anonymous/projects/javascript_term/',
                            'name': 'README.txt',
                            'type': 'doc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "CURRENTLY YOU ARE IN THIS PROJECT"
                            ]
                        },
                    },
                    'javascript_term.git': {
                        'options': {
                            'dir': '/home/anonymous/projects/javascript_term/',
                            'name': 'javascript_term.git',
                            'type': 'opengit',
                            'url': 'https://github.com/jonsomarlo/javascript_term/tree/v0.1',
                            'allow': 1,
                            'edit': 0,
                        }
                    },
                    'project.INFO': {
                        'options': {
                            'dir': '/home/anonymous/projects/javascript_term/',
                            'name': 'project.INFO',
                            'type': 'infodoc',
                            'allow': 1,
                            'edit': 0,
                            'content': [
                                "= PROYECTO: JAVASCRIPT_TERM ==================",
                                "----------------------------------------------",
                                " author: "+NAME+SURNAME,
                                "  start: 06/2019",
                                "    end: 05/2020",
                                "    lan: es_ES en_US",
                                "----------------------------------------------",
                                " Description:",
                                "    Simulation of a Linux command console on",
                                "    a web page, which is only local and is",
                                "    programmed in JavaScript.",
                                " ",
                                "    With controls and commands that try to",
                                "    make the user doubt if he is in a",
                                "    remote terminal.",
                                "----------------------------------------------",
                                " ",
                            ]
                        },
                    },
                },
            },
        },
    },
    'mnt': {
        'options': {
            'dir': '/',
            'name': 'mnt',
            'path': '/mnt/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
    'opt': {
        'options': {
            'dir': '/',
            'name': 'opt',
            'path': '/opt/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
    'proc': {
        'options': {
            'dir': '/',
            'name': 'proc',
            'path': '/proc/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
    'root': {
        'options': {
            'dir': '/',
            'name': 'root',
            'path': '/root/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
    'run': {
        'options': {
            'dir': '/',
            'name': 'run',
            'path': '/run/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
    'srv': {
        'options': {
            'dir': '/',
            'name': 'srv',
            'path': '/srv/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
    'sys': {
        'options': {
            'dir': '/',
            'name': 'sys',
            'path': '/sys/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
    'tmp': {
        'options': {
            'dir': '/',
            'name': 'tmp',
            'path': '/tmp/',
            'type': 'tmpfolder',
            'allow': 0,
            'edit': 0,
        },
    },
    'usr': {
        'options': {
            'dir': '/',
            'name': 'usr',
            'path': '/usr/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
    'var': {
        'options': {
            'dir': '/',
            'name': 'var',
            'path': '/var/',
            'type': 'folder',
            'allow': 0,
            'edit': 0,
        },
    },
};
var file = root['home']['anonymous'];
