import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import './app.css';



export default function App() {
  return (
    
    <div className="container-encurtador">
  <div className="container my-5">
    <div className="row justify-content-center g-5"> 
      
      {/* Coluna do formulário */}
      <div className="col-12 col-md-5 mb-5 mb-md-0"> 
        <UrlForm />
      </div>

      {/* Coluna da lista */}
      <div className="col-12 col-md-5">
        <UrlList />
      </div>

    </div>
  </div>
</div>

  );
}
