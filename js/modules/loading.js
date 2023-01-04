function createLoading (parent) {
    let loading = document.createElement("h2");
    loading.classList.add("loading");
    loading.textContent = "Loading..."

    parent.append(loading);
}

function hideLoading (parent) {
    parent.querySelector('.loading').remove();
}

export {createLoading, hideLoading};