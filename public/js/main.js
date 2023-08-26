document.addEventListener("DOMContentLoaded", () => {
    const recordList = document.getElementById("record-list");
    const cantidades = document.getElementById("cantidades");
    const paymentFilter = document.getElementById("payment-filter");
    const paginationDiv = document.getElementById('pagination');
    const apiUrl = "/api/records/ventas";

    paymentFilter.addEventListener("change", () => {
        recordList.innerHTML = "";
        const selectedValue = paymentFilter.value;
        if (selectedValue === 'paid') {
            renderData(1, 'pagos');
        } else {
            renderData(1, '');
        }
    });

    function displayPagination(totalPages, currentPage) {
        paginationDiv.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('btn', 'btn-outline-secondary');
            button.addEventListener('click', () => renderData(i));
            if (i === currentPage) {
                button.classList.add('active');
            }
            paginationDiv.appendChild(button);
        }
    }

    function getCookie(name) {
        const cookieString = decodeURIComponent(document.cookie);
        const cookies = cookieString.split('; ');
    
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].split('=');
            if (cookie[0] === name) {
                return cookie[1];
            }
        }
    
        return null;
    }

    const renderData = async (page, filter) => {
        let url;

        if (filter === 'pagos') {
            url = `${apiUrl}?page=${page}&filter=pagos`;
        } else {
            url = `${apiUrl}?page=${page}`;
        }

        const token = getCookie('authToken');

    
        try {

            const response = await fetch(url, {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            cantidades.innerText = `${data.docs.length}`;

            displayPagination(data.totalPages, page);
            recordList.innerHTML = "";

            data.docs.forEach(record => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.innerHTML = `
                    <strong>Email:</strong> ${record.email}<br>
                    <strong>Curso:</strong> ${record.curso || "N/A"}<br>
                    <strong>Pago:</strong> ${record.payment ? "Aprobado" : "No"}<br>
                    <strong>PDF:</strong> ${record.sent ? "Enviado" : "No enviado"}<br>
                    <strong>Fecha:</strong> ${record.creationDate || "N/A"}<br>
                `;
                recordList.appendChild(listItem);
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    renderData(1, '');

});

