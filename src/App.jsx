import './App.css';
import './index.css';
import { Home } from './views/Home/home';
import { PublishJobView } from './views/PublishJob/Publish';
import { Success } from './views/Success/Success';
import { Auth } from './views/Auth/Auth';
import { Route, Routes } from 'react-router-dom';
import { AdminView } from './views/Admin/AdminView';
import AdminPrivateRoute from './helpers/PrivateRoute';
import { Register } from './views/Register/Register';
import { CropImage } from './views/Cropper/Crop';

function App() {
    return (


                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/publish" element={<PublishJobView />} />
                    <Route path="/crop" element={<CropImage />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/admin" element={<AdminPrivateRoute><AdminView/></AdminPrivateRoute>}/>
                </Routes>

    );
}

export default App;

