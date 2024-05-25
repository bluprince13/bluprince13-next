const data =  {
    language: 'Spanish',
    pronouns: [
        'yo',
        'tú',
        'él/ella/Ud.',
        'nosotros',
        'vosotros',
        'ellos/ella/Uds.'
    ],
    forms: ['ar', 'er', 'ir'],
    tenses: [
        {
            name: 'Presente',
            mood: 'Indicativo',
            pointsInTime: [0, 0.25],
            forms: [
                {
                    name: 'ar',
                    verb: 'hablar',
                    stem: 'habl',
                    conjugation: {
                        yo: 'hablo',
                        tú: 'hablas',
                        'él/ella/Ud.': 'habla',
                        nosotros: 'hablamos',
                        vosotros: 'habláis',
                        'ellos/ella/Uds.': 'hablan'
                    }
                },
                {
                    name: 'er',
                    verb: 'comer',
                    stem: 'com',
                    conjugation: {
                        yo: 'como',
                        tú: 'comes',
                        'él/ella/Ud.': 'come',
                        nosotros: 'comemos',
                        vosotros: 'coméis',
                        'ellos/ella/Uds.': 'comen'
                    }
                },
                {
                    name: 'ir',
                    verb: 'vivir',
                    stem: 'viv',
                    conjugation: {
                        yo: 'vivo',
                        tú: 'vives',
                        'él/ella/Ud.': 'vive',
                        nosotros: 'vivimos',
                        vosotros: 'vivís',
                        'ellos/ella/Uds.': 'viven'
                    }
                }
            ]
        },
        {
            name: 'Pretérito indefinido',
            mood: 'Indicativo',
            pointsInTime: [-0.75],
            forms: [
                {
                    name: 'ar',
                    verb: 'hablar',
                    stem: 'habl',
                    conjugation: {
                        yo: 'hablé',
                        tú: 'hablaste',
                        'él/ella/Ud.': 'habló',
                        nosotros: 'hablamos',
                        vosotros: 'hablasteís',
                        'ellos/ella/Uds.': 'hablaron'
                    }
                },
                {
                    name: 'er',
                    verb: 'comer',
                    stem: 'com',
                    conjugation: {
                        yo: 'comí',
                        tú: 'comiste',
                        'él/ella/Ud.': 'comió',
                        nosotros: 'comimos',
                        vosotros: 'comisteís',
                        'ellos/ella/Uds.': 'comieron'
                    }
                },
                {
                    name: 'ir',
                    verb: 'vivir',
                    stem: 'viv',
                    conjugation: {
                        yo: 'viví',
                        tú: 'viviste',
                        'él/ella/Ud.': 'vivió',
                        nosotros: 'vivimos',
                        vosotros: 'vivisteís',
                        'ellos/ella/Uds.': 'vivieron'
                    }
                }
            ]
        },
        {
            name: 'Present perfect',
            mood: 'Indicativo',
            lineInTime: {
                x1: -0.25,
                x2: 0
            },
            forms: [
                {
                    name: 'ar',
                    verb: 'hablar',
                    participle: 'hablado',
                    conjugation: {
                        yo: 'he hablado',
                        tú: 'has hablado',
                        'él/ella/Ud.': 'ha hablado',
                        nosotros: 'hemos hablado',
                        vosotros: 'habéis hablado',
                        'ellos/ella/Uds.': 'han hablado'
                    }
                },
                {
                    name: 'er',
                    verb: 'comer',
                    participle: 'comido',
                    conjugation: {
                        yo: 'he comido',
                        tú: 'has comido',
                        'él/ella/Ud.': 'ha comido',
                        nosotros: 'hemos comido',
                        vosotros: 'habéis comido',
                        'ellos/ella/Uds.': 'han comido'
                    }
                },
                {
                    name: 'ir',
                    verb: 'vivir',
                    participle: 'vivido',
                    conjugation: {
                        yo: 'he vivido',
                        tú: 'has vivido',
                        'él/ella/Ud.': 'ha vivido',
                        nosotros: 'hemos vivido',
                        vosotros: 'habéis vivido',
                        'ellos/ella/Uds.': 'han vivido'
                    }
                }
            ]
        },
        {
            name: 'Imperfect',
            mood: 'Indicativo',
            lineInTime: { x1: -0.75, x2: -0.5 },
            forms: [
                {
                    name: 'ar',
                    verb: 'hablar',
                    stem: 'habl',
                    conjugation: {
                        yo: 'hablaba',
                        tú: 'hablabas',
                        'él/ella/Ud.': 'hablaba',
                        nosotros: 'hablabamos',
                        vosotros: 'hablabais',
                        'ellos/ella/Uds.': 'hablaban'
                    }
                },
                {
                    name: 'er',
                    verb: 'comer',
                    stem: 'comi',
                    conjugation: {
                        yo: 'comía',
                        tú: 'comías',
                        'él/ella/Ud.': 'comía',
                        nosotros: 'comíamos',
                        vosotros: 'comíais',
                        'ellos/ella/Uds.': 'comían'
                    }
                },
                {
                    name: 'ir',
                    verb: 'vivir',
                    stem: 'viv',
                    conjugation: {
                        yo: 'vivía',
                        tú: 'vivías',
                        'él/ella/Ud.': 'vivía',
                        nosotros: 'vivíamos',
                        vosotros: ' vivíais',
                        'ellos/ella/Uds.': 'vivían'
                    }
                }
            ]
        },
        {
            name: 'Futuro imperfecto',
            mood: 'Indicativo',
            pointsInTime: [0.75],
            forms: [
                {
                    name: 'ar',
                    verb: 'hablar',
                    stem: 'hablar',
                    conjugation: {
                        yo: 'hablaré',
                        tú: 'hablarás',
                        'él/ella/Ud.': 'hablará',
                        nosotros: 'hablaremos',
                        vosotros: 'hablaréis',
                        'ellos/ella/Uds.': 'hablarán'
                    }
                },
                {
                    name: 'er',
                    verb: 'comer',
                    stem: 'comer',
                    conjugation: {
                        yo: 'comeré',
                        tú: 'comerás',
                        'él/ella/Ud.': 'comerá',
                        nosotros: 'comeremos',
                        vosotros: 'comeréis',
                        'ellos/ella/Uds.': 'comerán'
                    }
                },
                {
                    name: 'ir',
                    verb: 'vivir',
                    stem: 'vivir',
                    conjugation: {
                        yo: 'viviré',
                        tú: 'vivirás',
                        'él/ella/Ud.': 'vivirá',
                        nosotros: 'viviremos',
                        vosotros: 'viviréis',
                        'ellos/ella/Uds.': 'vivirán'
                    }
                }
            ]
        },
        {
            name: 'Presente',
            mood: 'Subjunctivo',
            forms: [
                {
                    name: 'ar',
                    verb: 'hablar',
                    stem: 'habl',
                    conjugation: {
                        yo: 'hable',
                        tú: 'hables',
                        'él/ella/Ud.': 'hable',
                        nosotros: 'hablemos',
                        vosotros: 'habléis',
                        'ellos/ella/Uds.': 'hablen'
                    }
                },
                {
                    name: 'er',
                    verb: 'comer',
                    stem: 'com',
                    conjugation: {
                        yo: 'coma',
                        tú: 'comas',
                        'él/ella/Ud.': 'coma',
                        nosotros: 'comamos',
                        vosotros: 'comáis',
                        'ellos/ella/Uds.': 'coman'
                    }
                },
                {
                    name: 'ir',
                    verb: 'vivir',
                    stem: 'viv',
                    conjugation: {
                        yo: 'viviré',
                        tú: 'vivirás',
                        'él/ella/Ud.': 'vivirá',
                        nosotros: 'viviremos',
                        vosotros: 'viviréis',
                        'ellos/ella/Uds.': 'vivirán'
                    }
                }
            ]
        }
    ]
}

export default data