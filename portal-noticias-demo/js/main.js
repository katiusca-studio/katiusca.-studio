document.addEventListener('DOMContentLoaded', () => {
  // 1. Mostrar Fecha Actual Dinámica
  const dateElement = document.getElementById('current-date');
  const now = new Date();
  
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  // Capitalizar la primera letra del día
  let formattedDate = now.toLocaleDateString('es-ES', options);
  formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
  dateElement.textContent = formattedDate;
});
// 2. Inicializar Carrusel Hero (Swiper)
  const mainSwiper = new Swiper('.main-swiper', {
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  document.addEventListener('DOMContentLoaded', function() {
    const pollBox = document.getElementById('katiusca-poll-box');
    if (!pollBox) return;

    const voteBtn = document.getElementById('submit-poll-btn');
    const pollId = pollBox.getAttribute('data-poll-id');

    voteBtn.addEventListener('click', function() {
        const selectedInput = pollBox.querySelector('input[name="poll_option"]:checked');
        if (!selectedInput) {
            alert('Por favor selecciona una opción antes de votar.');
            return;
        }

        const optionIndex = selectedInput.value;

        // Petición AJAX asíncrona en tiempo real
        fetch(katiuscaAjax.ajaxurl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams({
                action: 'katiusca_vote',
                poll_id: pollId,
                option_index: optionIndex
            })
        })
        .then(response => response.json())
        .then(res => {
            if (res.success) {
                const data = res.data;
                const labels = pollBox.querySelectorAll('.poll-option-label');

                // Actualizar barras de porcentaje y textos visualmente en tiempo real
                labels.forEach((label, idx) => {
                    const fill = label.querySelector('.poll-fill');
                    const pctSpan = label.querySelector('.poll-pct');
                    const pct = data.percentages[idx] || 0;

                    fill.style.width = pct + '%';
                    pctSpan.textContent = pct + '% (' + data.votes[idx] + ' votos)';
                });

                document.getElementById('poll-vote-count').textContent = data.total;
                
                // Deshabilitar controles tras votar
                voteBtn.disabled = true;
                voteBtn.style.opacity = '0.5';
                voteBtn.textContent = '¡Voto Registrado!';
            }
        })
        .catch(error => console.error('Error en la encuesta:', error));
    });
});