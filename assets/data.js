/*
  DATA.JS — le seul fichier à modifier pour :
  - changer un texte (bio, compétences, formation)
  - ajouter / modifier / retirer un projet
  - brancher ou remplacer une démo

  Aucune connaissance en programmation nécessaire pour éditer ce fichier :
  respecte juste les guillemets " " et les virgules entre les lignes.

  TYPES DE DÉMO POSSIBLES POUR p.media :
  { type:"gif",   src:"chemin ou URL vers un .gif" }
  { type:"video", src:"chemin ou URL vers un .mp4", poster:"image affichée avant lecture (optionnel)" }
  { type:"slides", items:[{src:"...", caption:"..."}, ...] }   // diaporama avec légendes
  { type:"youtube", urls:[{label:"...", href:"https://youtu.be/..."}, ...] }  // liens externes
  { type:"pending" }  // aucune démo pour l'instant
*/

const SITE = {
  identity: {
    photo: "assets/images/avatar.jpg",
    initials: "JO",
    name: "Jessica Ouedraogo",
    role: "Ingénieure XR & Électromécanique",
    bio: "Ingénieure électromécanique à l'intersection de la vision par ordinateur, de la réalité étendue et de l'IA industrielle temps réel. Je conçois des systèmes appliqués qui relient le monde physique et le monde numérique.",
    motivation: "Ce qui me motive : prendre un système physique et lui donner une intelligence numérique — qu'il collecte, communique et interagisse avec son environnement. C'est ce fil conducteur qui relie tous mes projets."
  },

  skills: [
    { name: "Vision par ordinateur", desc: "Détection, suivi et classification d'objets en temps réel pour le contrôle qualité et la traçabilité industrielle." },
    { name: "Réalité étendue", desc: "Simulations immersives pour la formation, la sécurité et la conception industrielle." },
    { name: "Automatisation industrielle", desc: "Programmation d'automates et supervision de procédés pour un fonctionnement autonome et économe en énergie." }
  ],

  formation: [
    { name: "Master 2 Management des Technologies Interactives 3D", place: "Arts et Métiers (ENSAM), Chalon-sur-Saône — 2025–2026, double diplôme", logo: "logo-mono/ensam-chalon.png" },
    { name: "Diplôme d'Ingénieur d'État, Électromécanique", place: "ENSAM Meknès, Maroc — 2021–2026", logo: "logo-mono/ensam-meknes.png" }
  ],

  contact: {
    github: "https://github.com/JessicaOUEDRAOGO",
    linkedin: "https://www.linkedin.com/in/jessica-ouedraogo-2485332b0/",
    email: "ponguenewende.ouedraogo@ensam.eu"
  },

  themes: {
    vision: {
      title: "Vision par ordinateur",
      tagline: "Détection de défauts et traçabilité en temps réel, pour réduire les coûts de non-qualité et fiabiliser le contrôle sur ligne de production.",
      video: "assets/video/vision.mp4",
      accent: "cyan",
      projects: [
        {
          id: "defauts",
          title: "Détection automatique de pièces défectueuses sur une ligne de production",
          meta: "Projet académique — ENSAM, Chalon-sur-Saône",
          problem: "Sur une ligne avec plusieurs postes, un défaut repéré trop tard coûte cher en reprise ou en pièces jetées.",
          solution: "Un système de caméra qui reconnaît automatiquement à quel poste on se trouve et repère les défauts en temps réel, sans contrôleur humain à ce poste.",
          result: "Moins de reprise car le défaut est repéré plus tôt. Directement applicable à tout contrôle qualité encore fait à l'œil nu (textile, agroalimentaire, assemblage).",
          tools: ["Vision par ordinateur", "YOLOv8", "OpenCV"],
          link: "https://github.com/JessicaOUEDRAOGO/Portfolio/tree/main/Computer-Vision/AI-for-Industrial-Quality-Control",
          media: { type: "gif", src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/Computer-Vision/AI-for-Industrial-Quality-Control/AI.gif" }
        },
        {
          id: "aura",
          title: "Suivi d'objets identiques en temps réel",
          meta: "Stage recherche — Centrale Lyon-ENISE, Laboratoire LIRIS &amp; Institut Lyfe, Saint-Étienne — février–juillet 2026",
          logo: "logo-mono/liris.png",
          problem: "Suivre en continu les déplacements d'un objet manipulé par une personne — y compris ses hésitations, ses changements d'avis, et le moment où elle le soulève au-dessus de la table — sans perturber son geste ni fausser la fiabilité des résultats.",
          solution: "Un système à deux caméras qui suit individuellement jusqu'à 9 objets en temps réel, en conservant à chacun une identité unique même lorsqu'ils se croisent ou sont soulevés de la table, avec correction automatique en cas d'erreur de suivi.",
          result: "Un logiciel autonome, testé et validé scientifiquement avec 15 participants. La même logique de suivi individuel et sans confusion s'applique directement à une chaîne de production ou à un inventaire d'objets identiques — un besoin classique de traçabilité industrielle.",
          tools: ["Vision par ordinateur", "Python", "OpenCV", "Traitement d'image"],
          media: { type: "youtube", urls: [
            { label: "Voir la démo table AR projective", href: "https://youtu.be/09n3_XLtsuc" },
            { label: "Voir la démo du suivi", href: "https://youtu.be/p5DINCD6Dqg" }
          ]}
        },
        {
          id: "armes",
          title: "Système de reconnaissance d'armes pour la formation et la sécurité",
          meta: "Académie Royale Militaire de Meknès, Maroc",
          problem: "Entraîner des cadets à reconnaître, démonter et remonter des armes à feu est risqué et coûteux si on doit toujours mobiliser le matériel réel et un instructeur.",
          solution: "Un système de reconnaissance par caméra qui identifie automatiquement le modèle d'arme tenue par l'utilisateur (via un casque de réalité mixte) et déclenche une vidéo de démonstration du montage/démontage correspondant — étendu ensuite à la détection d'armes en direct sur caméras de surveillance.",
          result: "Un entraînement répétable et sécurisé, sans immobiliser l'équipement réel à chaque fois. Directement transposable à la formation d'opérateurs de maintenance ou de montage dans l'industrie.",
          tools: ["Vision par ordinateur", "YOLOv8", "OpenCV"],
          link: "https://github.com/JessicaOUEDRAOGO/Portfolio/tree/main/Computer-Vision/Real-Time%20Firearm%20Detection",
          media: { type: "gif", src: "https://github.com/user-attachments/assets/8469fc1f-2440-4a14-ab0a-9b8e2f4aea3a" }
        }
      ]
    },

    xr: {
      title: "Réalité étendue",
      tagline: "Formation immersive à la sécurité et aux gestes techniques, pour former sans interrompre la production ni exposer les opérateurs au risque.",
      video: "assets/video/xr.mp4",
      accent: "cyan",
      projects: [
        {
          id: "grdf",
          title: "Formation sécurité en réalité virtuelle",
          meta: "En partenariat avec GRDF (Gaz Réseau Distribution France) — projet TerraRisk VR",
          logo: "logo-mono/grdf.png",
          problem: "Sur un chantier, les accidents liés au non-respect des règles de sécurité sont graves.",
          solution: "Une simulation immersive (casque de visualisation 3D) qui place la personne à l'intérieur d'une tranchée de chantier mal protégée, qui s'effondre au passage d'un véhicule, pour lui faire vivre concrètement les conséquences d'un mauvais étayage.",
          result: "Un outil de formation qui fait vivre le danger sans aucun risque réel. Applicable à la formation sécurité dans le BTP, l'énergie ou toute industrie à risque.",
          tools: ["Casque de visualisation 3D", "Unity", "Blender", "3ds Max"],
          link: "https://github.com/JessicaOUEDRAOGO/Portfolio",
          media: { type: "combo", items: [
            { type: "slides", items: [
              { src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_1.jpg", caption: "Une journée sur le chantier" },
              { src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_2.jpg", caption: "Étayage insuffisant face aux charges de surface" },
              { src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_3.jpg", caption: "Un véhicule qui passe déclenche l'effondrement de la tranchée" },
              { src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_4.jpg", caption: "Avec un étayage non conforme" },
              { src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_5.jpg", caption: "Vous êtes exposé à l'effondrement de la tranchée" },
              { src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_6.jpg", caption: "Avec un étayage conforme" },
              { src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_7.jpg", caption: "Une journée de travail sans accident" }
            ]},
            { type: "video",
              src: "https://media.githubusercontent.com/media/JessicaOUEDRAOGO/Portfolio/main/grdf/Terrarisk_VR1.mp4",
              poster: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/grdf/slide_1.jpg"
            }
          ]}
        },
        {
          id: "parkinson",
          title: "Simulation immersive des tremblements liés à la maladie de Parkinson",
          meta: "Hackathon",
          type: "lite",
          description: "Faire ressentir concrètement le handicap à des soignants en formation.",
          tools: ["Unity", "Blender", "Casque VR"],
          link: "https://github.com/JessicaOUEDRAOGO/Portfolio/tree/main/unity/Parkinson",
          media: { type: "gif", src: "https://github.com/user-attachments/assets/d3f08d9e-338a-41f6-a803-ce86bf8624b3" }
        },
        {
          id: "classe-virtuelle",
          title: "Salle de classe virtuelle collaborative",
          meta: "Projet multi-utilisateurs",
          type: "lite",
          description: "Environnement multi-utilisateurs pour l'apprentissage à distance.",
          tools: ["Unity", "Netcode for GameObjects", "Vivox"],
          link: "https://github.com/JessicaOUEDRAOGO/Portfolio/tree/main/unity/classRoomCollaborative",
          media: { type: "gif", src: "https://github.com/user-attachments/assets/26591270-33df-4bfa-af63-5d0ca5c7b92b" }
        },
        {
          id: "modelisation-3d",
          title: "Modélisation 3D de bâtiments et de mécanismes",
          meta: "Projet de modélisation",
          type: "lite",
          description: "Visualisation avant réalisation physique.",
          tools: ["Unreal Engine", "3ds Max"],
          link: "https://github.com/JessicaOUEDRAOGO/Portfolio/tree/main/unreal/House",
          media: { type: "slides", items: [
            { src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/unreal/House/Rendu_1.png", caption: "Vue de face — éclairage soirée d'hiver" },
            { src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/unreal/House/Rendu_2.png", caption: "Profondeur de champ à travers les arbres" },
            { src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/unreal/House/Rendu_3.png", caption: "Vue en contre-plongée — golden hour" }
          ]}
        }
      ]
    },

    auto: {
      title: "Automatisation industrielle",
      tagline: "Pilotage automatique des procédés, pour réduire la consommation d'énergie et l'usure du matériel sans surveillance humaine constante.",
      video: "assets/video/auto.mp4",
      accent: "amber",
      projects: [
        {
          id: "sonabel",
          title: "Automatisation du refroidissement des groupes électrogènes",
          meta: "SONABEL, Burkina Faso — juillet–août 2024",
          logo: "logo-mono/sonabel.png",
          problem: "Le système de refroidissement des aéroréfrigérants des groupes électrogènes tournait à pleine puissance en permanence : gaspillage d'énergie et usure du matériel.",
          solution: "Programmation d'un automate pour qu'il déclenche et ajuste automatiquement le refroidissement selon la température réelle, avec un suivi en temps réel sur écran.",
          result: "Ce principe (démarrage sur seuil + vitesse variable au lieu du tout-ou-rien) est l'un des leviers d'économie d'énergie les plus utilisés en industrie. Il s'applique à n'importe quel équipement à moteur qui tourne en continu par défaut : pompes, compresseurs, ventilation d'usine.",
          tools: ["Automate Siemens S7-1200", "TIA Portal", "Supervision SCADA", "Node-RED"],
          media: { type: "pending" }
        },
        {
          id: "structal",
          title: "Automatisation d'un système d'arrosage de fontaine",
          meta: "Structal Engineering, Maroc — juillet–août 2025",
          logo: "logo-mono/structal.png",
          problem: "Piloter le démarrage et l'arrêt de pompes à des horaires précis, sans intervention humaine — un besoin classique de gestion de fluides en automatisme industriel.",
          solution: "Programmation d'un automate pour gérer les cycles marche/arrêt des pompes, du besoin exprimé jusqu'à la mise en service (cas d'application traité : une fontaine automatisée).",
          result: "Un fonctionnement autonome, sans surveillance constante. La même méthode s'applique directement à l'irrigation agricole automatisée ou au pompage d'eau — un enjeu central pour l'agriculture et l'accès à l'eau.",
          tools: ["Automate Siemens / Flexem", "TIA Portal", "Supervision SCADA"],
          media: { type: "pending" }
        },
        {
          id: "intellcap",
          title: "Gilet connecté pour le suivi sportif",
          meta: "INTELLCAP, Rabat, Maroc — mai–août 2025",
          logo: "logo-mono/intellcap.png",
          problem: "Assurer le suivi en temps réel de plusieurs paramètres physiologiques d'un sportif pendant l'effort.",
          solution: "Conception d'un gilet équipé de capteurs qui envoient leurs données en direct vers un écran de suivi, de la prise de mesure jusqu'à l'affichage.",
          result: "Une chaîne complète \"capteur — réseau — écran\" qui fonctionne. C'est exactement la même brique technique qui permet de surveiller à distance une machine industrielle (température, vibrations, niveau de cuve) — une étape clé de la digitalisation d'une usine.",
          tools: ["Capteurs", "MQTT / Node-RED", "Unity", "Visualisation temps réel"],
          link: "https://github.com/JessicaOUEDRAOGO/Portfolio",
          media: { type: "gif", src: "https://raw.githubusercontent.com/JessicaOUEDRAOGO/Portfolio/main/unity/gilet/gilet-demo.gif" }
        }
      ]
    }
  }
};
