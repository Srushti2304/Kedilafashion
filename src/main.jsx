import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { BrowserRouter} from 'react-router'
import Routing from './components/Routing'
import './index.css'
import { Provider } from 'react-redux'
import mystore from './redux/mystore'

createRoot(document.getElementById('root')).render(
  <Provider store= {mystore}>
    <BrowserRouter>
      <Routing/>
    </BrowserRouter>
  </Provider>
)

