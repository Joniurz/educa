$(document).ready(() => {
    $('#mobile_btn').on('click', () => {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', () => {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop+ section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    })

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    })
});

const therapeutics = document.getElementById('therapeutics');
const prevButton = document.getElementById('prev-therapeutic');
const nextButton = document.getElementById('next-therapeutic');

let currentIndex = 0;
const totalItems = therapeutics.children.length;

// Função para atualizar a posição do carrossel
function updateCarousel() {
    const therapeuticWidth = therapeutics.children[0].offsetWidth; // Largura de um item
    therapeutics.style.transform = `translateX(-${currentIndex * therapeuticWidth}px)`;
}

// Evento para botão "anterior"
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Evento para botão "próximo"
nextButton.addEventListener('click', () => {
    if (currentIndex < totalItems - 1) {
        currentIndex++;
        updateCarousel();
    }
});

// Suporte a gestos de toque
let startX = 0;
let endX = 0;

therapeutics.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

therapeutics.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;

    if (startX > endX + 50 && currentIndex < totalItems - 1) {
        currentIndex++;
        updateCarousel();
    } else if (startX < endX - 50 && currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});
