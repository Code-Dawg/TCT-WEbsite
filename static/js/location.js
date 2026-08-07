function handleInquirySubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const outlet = document.getElementById('contactOutlet').value;

    showToast(`✉️ Thank you ${name}! Your inquiry for ${outlet} has been received. Our team will get in touch shortly.`, 'success');

    e.target.reset();
}
