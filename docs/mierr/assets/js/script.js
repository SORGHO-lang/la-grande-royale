/* ==========================================================================
   MIERR — script.js
   Interactions du site : menu, accordeon, onglets, galerie/lightbox,
   formulaires, animations au defilement.
   ========================================================================== */

/* Reglages rapides : numero WhatsApp et adresses e-mail de la MIERR.
   A completer avec les vraies coordonnees officielles. */
var CONFIG = {
  whatsapp: "22600000000", // numero international, sans le "+", A REMPLACER
  messageWhatsapp: "Bonjour MIERR, je souhaite avoir des renseignements...",
  emails: ["contact@mierr.org"] // A REMPLACER par les vraies adresses
};

document.addEventListener("DOMContentLoaded", function () {
  initEntete();
  initMenuMobile();
  initBarreProgression();
  initAccordeons();
  initOnglets();
  initFiltresGalerie();
  initLightbox();
  initVideos();
  initAnimations();
  initCompteurs();
  initFormulaires();
  initWhatsapp();
  initAnneeCourante();
});

/* -------------------------------------------------------------------- */
/* En-tete opaque au defilement                                          */
/* -------------------------------------------------------------------- */
function initEntete() {
  var entete = document.querySelector(".entete");
  if (!entete) return;
  function majEntete() {
    if (window.scrollY > 40) entete.classList.add("est-scroll");
    else entete.classList.remove("est-scroll");
  }
  majEntete();
  window.addEventListener("scroll", majEntete, { passive: true });
}

/* -------------------------------------------------------------------- */
/* Menu plein ecran mobile                                               */
/* -------------------------------------------------------------------- */
function initMenuMobile() {
  var ouvrir = document.querySelector(".bouton-menu");
  var menu = document.querySelector(".menu-mobile");
  var fermer = document.querySelector(".fermer-menu");
  if (!ouvrir || !menu) return;

  function toggle(etat) {
    menu.classList.toggle("est-ouvert", etat);
    document.body.classList.toggle("menu-ouvert", etat);
  }
  ouvrir.addEventListener("click", function () { toggle(true); });
  if (fermer) fermer.addEventListener("click", function () { toggle(false); });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { toggle(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") toggle(false);
  });
}

/* -------------------------------------------------------------------- */
/* Barre de progression de lecture                                       */
/* -------------------------------------------------------------------- */
function initBarreProgression() {
  var barre = document.querySelector(".barre-progression");
  if (!barre) return;
  function maj() {
    var h = document.documentElement;
    var pourcentage = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    barre.style.width = (isFinite(pourcentage) ? pourcentage : 0) + "%";
  }
  maj();
  window.addEventListener("scroll", maj, { passive: true });
  window.addEventListener("resize", maj);
}

/* -------------------------------------------------------------------- */
/* Accordeons (FAQ, formations, historique detaille...)                  */
/* -------------------------------------------------------------------- */
function initAccordeons() {
  document.querySelectorAll(".accordeon-item").forEach(function (item) {
    var tete = item.querySelector(".accordeon-tete");
    var corps = item.querySelector(".accordeon-corps");
    if (!tete || !corps) return;
    tete.addEventListener("click", function () {
      var estOuvert = item.classList.contains("est-ouvert");
      // Ferme les autres items du meme groupe (accordeon exclusif)
      var groupe = item.closest("[data-accordeon-groupe]");
      if (groupe) {
        groupe.querySelectorAll(".accordeon-item.est-ouvert").forEach(function (autre) {
          if (autre !== item) {
            autre.classList.remove("est-ouvert");
            autre.querySelector(".accordeon-corps").style.maxHeight = null;
          }
        });
      }
      item.classList.toggle("est-ouvert", !estOuvert);
      corps.style.maxHeight = !estOuvert ? corps.scrollHeight + "px" : null;
    });
  });
}

/* -------------------------------------------------------------------- */
/* Onglets (departements, activites)                                     */
/* -------------------------------------------------------------------- */
function initOnglets() {
  document.querySelectorAll("[data-onglets]").forEach(function (groupe) {
    var boutons = groupe.querySelectorAll(".onglet-bouton");
    var panneaux = groupe.querySelectorAll(".onglet-panneau");
    boutons.forEach(function (bouton) {
      bouton.addEventListener("click", function () {
        var cible = bouton.getAttribute("data-cible");
        boutons.forEach(function (b) { b.classList.toggle("est-actif", b === bouton); });
        panneaux.forEach(function (p) {
          p.classList.toggle("est-actif", p.getAttribute("data-panneau") === cible);
        });
        history.replaceState(null, "", "#" + cible);
      });
    });
    // Ouvre l'onglet correspondant au hash de l'URL, si present
    var hash = window.location.hash.replace("#", "");
    var boutonCorrespondant = groupe.querySelector('.onglet-bouton[data-cible="' + hash + '"]');
    if (boutonCorrespondant) boutonCorrespondant.click();
  });
}

/* -------------------------------------------------------------------- */
/* Filtres de galerie                                                    */
/* -------------------------------------------------------------------- */
function initFiltresGalerie() {
  var filtres = document.querySelectorAll(".filtre-bouton");
  var items = document.querySelectorAll(".galerie-item");
  if (!filtres.length || !items.length) return;
  filtres.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      filtres.forEach(function (b) { b.classList.remove("est-actif"); });
      bouton.classList.add("est-actif");
      var categorie = bouton.getAttribute("data-filtre");
      items.forEach(function (item) {
        var correspond = categorie === "tous" || item.getAttribute("data-categorie") === categorie;
        item.style.display = correspond ? "" : "none";
      });
    });
  });
}

/* -------------------------------------------------------------------- */
/* Lightbox photo                                                        */
/* -------------------------------------------------------------------- */
function initLightbox() {
  var items = Array.prototype.slice.call(document.querySelectorAll(".galerie-item[data-plein]"));
  var lightbox = document.querySelector(".lightbox");
  if (!items.length || !lightbox) return;

  var img = lightbox.querySelector("img");
  var legende = lightbox.querySelector(".lightbox-legende");
  var index = 0;

  function visibles() {
    return items.filter(function (i) { return i.style.display !== "none"; });
  }
  function ouvrir(i) {
    var liste = visibles();
    index = liste.indexOf(i);
    if (index === -1) index = 0;
    afficher();
    lightbox.classList.add("est-ouvert");
    document.body.classList.add("menu-ouvert");
  }
  function afficher() {
    var liste = visibles();
    var item = liste[index];
    if (!item) return;
    img.src = item.getAttribute("data-plein");
    img.alt = item.getAttribute("data-legende") || "";
    if (legende) legende.textContent = item.getAttribute("data-legende") || "";
  }
  function fermer() {
    lightbox.classList.remove("est-ouvert");
    document.body.classList.remove("menu-ouvert");
  }
  function suivant() { var liste = visibles(); index = (index + 1) % liste.length; afficher(); }
  function precedent() { var liste = visibles(); index = (index - 1 + liste.length) % liste.length; afficher(); }

  items.forEach(function (item) {
    item.addEventListener("click", function () { ouvrir(item); });
  });
  var btnFermer = lightbox.querySelector(".lightbox-fermer");
  var btnSuivant = lightbox.querySelector(".lightbox-suivant");
  var btnPrecedent = lightbox.querySelector(".lightbox-precedent");
  if (btnFermer) btnFermer.addEventListener("click", fermer);
  if (btnSuivant) btnSuivant.addEventListener("click", suivant);
  if (btnPrecedent) btnPrecedent.addEventListener("click", precedent);
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) fermer(); });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("est-ouvert")) return;
    if (e.key === "Escape") fermer();
    if (e.key === "ArrowRight") suivant();
    if (e.key === "ArrowLeft") precedent();
  });
}

/* -------------------------------------------------------------------- */
/* Videos (chargement au clic, pour garder la page rapide)               */
/* -------------------------------------------------------------------- */
function initVideos() {
  document.querySelectorAll(".video-tuile[data-video]").forEach(function (tuile) {
    tuile.addEventListener("click", function () {
      var id = tuile.getAttribute("data-video");
      if (!id) return; // identifiant YouTube non renseigne pour le moment
      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1";
      iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      iframe.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0;";
      tuile.style.position = "relative";
      tuile.innerHTML = "";
      tuile.appendChild(iframe);
    });
  });
}

/* -------------------------------------------------------------------- */
/* Animations d'apparition au defilement                                 */
/* -------------------------------------------------------------------- */
function initAnimations() {
  var elements = document.querySelectorAll("[data-anim]");
  if (!elements.length) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    elements.forEach(function (el) { el.classList.add("est-visible"); });
    return;
  }
  var observateur = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (entree.isIntersecting) {
        entree.target.classList.add("est-visible");
        observateur.unobserve(entree.target);
      }
    });
  }, { threshold: 0.15 });
  elements.forEach(function (el) { observateur.observe(el); });
}

/* -------------------------------------------------------------------- */
/* Compteurs animes                                                      */
/* -------------------------------------------------------------------- */
function initCompteurs() {
  var compteurs = document.querySelectorAll("[data-compte]");
  if (!compteurs.length || !("IntersectionObserver" in window)) return;
  var observateur = new IntersectionObserver(function (entrees) {
    entrees.forEach(function (entree) {
      if (!entree.isIntersecting) return;
      var el = entree.target;
      var cible = parseInt(el.getAttribute("data-compte"), 10) || 0;
      var duree = 1400;
      var depart = null;
      function pas(horodatage) {
        if (!depart) depart = horodatage;
        var progres = Math.min((horodatage - depart) / duree, 1);
        el.textContent = Math.floor(progres * cible).toLocaleString("fr-FR");
        if (progres < 1) requestAnimationFrame(pas);
        else el.textContent = cible.toLocaleString("fr-FR");
      }
      requestAnimationFrame(pas);
      observateur.unobserve(el);
    });
  }, { threshold: 0.5 });
  compteurs.forEach(function (el) { observateur.observe(el); });
}

/* -------------------------------------------------------------------- */
/* Formulaires (contact, inscription institut) -> ouverture messagerie   */
/* -------------------------------------------------------------------- */
function initFormulaires() {
  document.querySelectorAll("form[data-formulaire]").forEach(function (form) {
    var message = form.querySelector(".formulaire-message");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var donnees = new FormData(form);
      var champsManquants = [];
      form.querySelectorAll("[required]").forEach(function (champ) {
        if (!champ.value.trim()) champsManquants.push(champ);
      });
      if (champsManquants.length) {
        afficherMessage(message, "erreur", "Merci de completer tous les champs obligatoires.");
        champsManquants[0].focus();
        return;
      }
      var objet = form.getAttribute("data-objet") || "Message depuis le site MIERR";
      var lignes = [];
      donnees.forEach(function (valeur, cle) {
        if (valeur) lignes.push(cle + " : " + valeur);
      });
      var corps = encodeURIComponent(lignes.join("\n"));
      var destinataires = CONFIG.emails.join(",");
      window.location.href = "mailto:" + destinataires + "?subject=" + encodeURIComponent(objet) + "&body=" + corps;
      afficherMessage(message, "ok", "Votre logiciel de messagerie va s'ouvrir avec votre message pre-rempli.");
      form.reset();
    });
  });

  // Pre-selection de l'objet via ?objet=... dans l'URL
  var params = new URLSearchParams(window.location.search);
  var objetParam = params.get("objet");
  if (objetParam) {
    document.querySelectorAll('select[name="objet"]').forEach(function (select) {
      Array.prototype.forEach.call(select.options, function (option) {
        if (option.value.toLowerCase() === objetParam.toLowerCase()) option.selected = true;
      });
    });
  }
}

function afficherMessage(element, type, texte) {
  if (!element) return;
  element.textContent = texte;
  element.className = "formulaire-message est-visible formulaire-message--" + type;
}

/* -------------------------------------------------------------------- */
/* Bouton WhatsApp flottant + liens WhatsApp                             */
/* -------------------------------------------------------------------- */
function initWhatsapp() {
  var lien = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(CONFIG.messageWhatsapp);
  document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
    a.setAttribute("href", lien);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });
}

/* -------------------------------------------------------------------- */
/* Annee courante (copyright)                                            */
/* -------------------------------------------------------------------- */
function initAnneeCourante() {
  document.querySelectorAll("[data-annee]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
}
