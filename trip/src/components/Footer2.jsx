import './css/Footer2.css'
import titIcon from './css/picss/title-icon2.svg'
export default function Footer2() {

  function scrollToPage(page) {
    const home = document.querySelector('.main-page');
    const explorePage = document.querySelector('.explore-page');
    const clientOp = document.querySelector('.client-op');
    const feedbacks = document.querySelector('.feedback-section');

    switch (page) {
      case 'explore':
        if (explorePage) {
          const scrlTop = window.scrollY + explorePage.getBoundingClientRect().top;
          const offset = window.innerHeight * 0.18;

          window.scrollTo({
            top: scrlTop - offset,
            behavior: 'smooth'
          })
        }
        break;
      case 'home':
        if (home) {
          const scrlTop = window.scrollY + home.getBoundingClientRect().top;
          const offset = window.innerHeight * 0.18;

          window.scrollTo({
            top: scrlTop - offset,
            behavior: 'smooth'
          })
        }
        break;
      case 'client':
        if (clientOp) {
          const scrlTop = window.scrollY + clientOp.getBoundingClientRect().top;
          const offset = window.innerHeight * 0.3;

          window.scrollTo({
            top: scrlTop - offset,
            behavior: 'smooth'
          })
        }
        break;
      case 'feedback':
        if (feedbacks) {
          const scrlTop = window.scrollY + feedbacks.getBoundingClientRect().top;
          const offset = window.innerHeight * 0.18;
          window.scrollTo({
            top: scrlTop - offset,
            behavior: 'smooth'
          })
        }
        break;
    }

  };
  return (
    <footer>
      <div className="footer">
        <div className="social-contact">
          <div className="slogo">
            <img src={titIcon}></img>
            <h1>TravelWUs</h1>
          </div>
          <div className="icons">
            <a href="https://t.me/oussama_bznx" target="_blank"><i class='bx bxl-telegram'></i></a>
            <a href="https://instagram.com/oussama._znx" target="_blank"><i class='bx bxl-instagram'></i></a>
            <a href="https://discord.com/oussama_x7" target="_blank"><i class='bx bxl-discord-alt'></i></a>
          </div>
        </div>
     
        <div className="copy">
        <p id='copyright'>&copy;TravelWUs | All Right Reserved</p>
      </div>
        <div className="contact-details">
          <h1>Contact Us</h1>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=megdoud.abdelkader@ensia.edu.dz"
            target="_blank"
            rel="noreferrer"
          >

            megdoud.abdelkader@ensia.edu.dz
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=oussama.bouziane@ensia.edu.dz"
            target="_blank"
            rel="noreferrer"
          >

            oussama.bouziane@ensia.edu.dz
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=mohammed.benadda@ensia.edu.dz"
            target="_blank"
            rel="noreferrer"
          >

            mohaammed.bedadda@ensia.edu.dz
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=zakarya.bouzid@ensia.edu.dz"
            target="_blank"
            rel="noreferrer"
          >

            zakarya.bouzid@ensia.edu.dz
          </a>
        </div>
      

      </div>
    </footer>
  )
}