
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SideBar from './components/SideBar';
import { AuthProvider } from './AuthContext';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import Master from './components/Master';
import RelationalMasterItem from './components/RelationalMasterItem';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

function App() {
 
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <SideBar>
                  <Routes>
                    <Route path="/home" element={<Dashboard />} />
                    <Route path="/category" element={<Master api="/itemcategory/" heading="Item Category" />} />
                    <Route path="/family" element={<RelationalMasterItem
                                            api="/itemfamily/" 
                                            list="item" 
                                            heading="Item Family" 
                                            formcolumn="category" 
                                            listcolumn="category" />} />
                    <Route path="/types" element={<RelationalMasterItem 
                                          api="/itemtypes/" 
                                          list="itemtypes" 
                                          heading="Item Types" 
                                          formcolumn="itemfamily" 
                                          listcolumn="family" />} />
                    <Route path="/subtype1" element={<RelationalMasterItem 
                                          api="/subtype1/" 
                                          list="item" 
                                          heading="Item Subtype1" 
                                          formcolumn="itemtype" 
                                          listcolumn="itemtype" />} />
                    <Route path="/subtype2" element={<RelationalMasterItem 
                                          api="/subtype2/" 
                                          list="item" 
                                          heading="Item Subtype2" 
                                          formcolumn="itemtype" 
                                          listcolumn="itemtype" />} />

                    <Route path="/moc" element={<RelationalMasterItem 
                                          api="/moc/" 
                                          list="item" 
                                          heading="Material of Construction" 
                                          formcolumn="itemcategory" 
                                          listcolumn="category" />} />
                    <Route path="/mg" element={<Master api="/mg/" heading="Material Grade" />} />
                    <Route path="/specification" element={<Master api="/specification/" heading="Specification" />} />
                    <Route path="/process" element={<Master api="/process/" heading="Process" />} />
                    <Route path="/stage" element={<Master api="/stages/" heading="Stages" />} />
                    <Route path="/supplytype" element={<Master api="/supplytype/" heading="Supply Types" />} />
                    <Route path="/dimension" element={<Master api="/dimension/" heading="Dimension" />} />
                    <Route path="/techspec" element={<Master api="/technicalspecification/" heading="Technical Specification" />} />
                    <Route path="/otherdetails" element={<Master api="/otherdetails/" heading="Other Details" />} />
                    <Route path="/itemmake" element={<Master api="/itemmake/" heading="Item Make" />} />
                   
                    <Route path="/stockingtype" element={<Master api="/stockingtype/" heading="Stocking Type" />} />
                    <Route path="/linetype" element={<Master api="/linetype/" heading="Line Type" />} />
                    <Route path="/uom" element={<Master api="/uom/" heading="Uom" />} />
                    <Route path="/hsn" element={<Master api="/hsn/" heading="Hsn" />} />
                    <Route path="/cmc" element={<Master api="/commodityclass/" heading="Commodity Class" />} />
                    <Route path="/scm" element={<Master api="/commoditysubclass/" heading="Commodity sub class" />} />
                </Routes>
                </SideBar>
              </ProtectedRoute>
            }
            />
          </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
