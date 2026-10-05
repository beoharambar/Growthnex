/* =========================================================
   GROWTHNEX — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const video = document.querySelector(".hero-video");
    const navbar = document.querySelector(".navbar");
    const hero = document.querySelector(".hero");

    const footerButtons =
        document.querySelectorAll(".footer-heading");

    const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;


    /* =====================================================
       HERO VIDEO PARALLAX
    ===================================================== */

    if (video && hero && !prefersReducedMotion) {

        let ticking = false;

        const updateVideo = () => {

            const scrollY = window.scrollY;

            const heroHeight = hero.offsetHeight;

            /*
             * Only animate while the hero is visible.
             */

            if (scrollY <= heroHeight) {

                const scale =
                    1.02 + (scrollY * 0.00012);

                const translateY =
                    scrollY * 0.04;

                video.style.transform =
                    `translate3d(0, ${translateY}px, 0) scale(${scale})`;

            }

            ticking = false;
        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateVideo
                    );

                    ticking = true;
                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       NAVBAR SCROLL STATE
    ===================================================== */

    if (navbar) {

        const updateNavbar = () => {

            if (window.scrollY > 50) {

                navbar.classList.add("navbar-scrolled");

            } else {

                navbar.classList.remove("navbar-scrolled");

            }

        };


        updateNavbar();


        window.addEventListener(
            "scroll",
            updateNavbar,
            {
                passive: true
            }
        );

    }


    /* =====================================================
       MOBILE FOOTER ACCORDION
    ===================================================== */

    if (footerButtons.length > 0) {

        const isMobile =
            () => window.innerWidth <= 600;


        /*
         * Set initial mobile state.
         */

        const setupFooter = () => {

            const footerLists =
                document.querySelectorAll(".footer-list");

            footerLists.forEach((list) => {

                if (isMobile()) {

                    list.style.display = "none";

                } else {

                    list.style.display = "flex";

                }

            });

        };


        setupFooter();


        /*
         * Footer click interaction.
         */

        footerButtons.forEach((button) => {

            button.addEventListener("click", () => {

                if (!isMobile()) {
                    return;
                }


                const currentList =
                    button.nextElementSibling;


                if (!currentList) {
                    return;
                }


                const isOpen =
                    currentList.style.display === "flex";


                /*
                 * Close all sections first.
                 */

                document
                    .querySelectorAll(".footer-list")
                    .forEach((list) => {

                        list.style.display = "none";

                    });


                /*
                 * Remove active state.
                 */

                footerButtons.forEach((item) => {

                    item.classList.remove(
                        "footer-heading-active"
                    );

                });


                /*
                 * Open selected section.
                 */

                if (!isOpen) {

                    currentList.style.display = "flex";

                    button.classList.add(
                        "footer-heading-active"
                    );

                }

            });

        });


        /*
         * Recalculate when screen changes
         * between mobile and desktop.
         */

        window.addEventListener(
            "resize",
            setupFooter
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetID =
                link.getAttribute("href");


            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetID);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"
            });

        });

    });


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );

});