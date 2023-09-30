import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Studying from "../../assets/studying.png";
import { AiOutlineFileText } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { MdOutlineDesignServices } from "react-icons/md";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { useCookies } from "react-cookie";
import { BiEditAlt } from "react-icons/bi";

const Dashboard = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [cookies, removeCookie] = useCookies([]);

  const [isModal, setIsModal] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [editblog, setEditBlog] = useState({});

  const [editform, seteditform] = useState("");

  // state to store all blog details
  const [userBlogs,setUserBlogs] = useState([])

  // state to store form data of new blog to be added
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
    createdAt: "",
  });

  // store form data in state
  const handleForm = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  // store edit form data in state
  const updateForm = (e) => {
    const { name, value } = e.target;
    setEditBlog({
      ...editblog,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(blog));
    setIsSubmit(true);
  };

  // get all the blogs from server
  const getBlog = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/user/getblogs/${id}`
    );
    console.log("BLOGS DATA", data.blog);
    if (data.message === "true") {
      setUserBlogs(data.blog);
      localStorage.setItem("blogs", data.blog);
    }else{
      console.log("NO BLOGS")
    }
  };

  useEffect(() => {
    // user authentication
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {

        const { data } = await axios.post(
          `http://localhost:8000/user`,
          {},
          { withCredentials: true }
        );
    
        if (data.id !== id || data.status !== true) {
          // removeCookie("jwt")
          navigate("/login");
        } else {
          navigate(`/user/${id}`);
          getBlog();
        }
      }
    };
    verifyUser();


    // form submission to backend
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log("BLOG DETAILS", blog);
      axios
        .post(`http://localhost:8000/user/createBlog/${id}`, {
          ...blog,
        })
        .then((res) => {
          if (res.data.errors) {
            setFormErrors(res.data.errors);
          } else if (res.data.message === "true") {
            setIsModal(!isModal);
            getBlog();     // again bring all blog details
          }
        });
    }
  }, [formErrors, cookies, removeCookie, navigate]);

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Title required";
    }

    if (!values.content) {
      errors.content = "Content required";
    }

    if (!values.image) {
      errors.image = "Image URL required";
    }

    if (!values.createdAt) {
      errors.createdAt = "Created at date required";
    }

    return errors;
  };

  const Cancel = () => {
    setIsModal(!isModal);
    setIsSubmit(false);
    setFormErrors({});
  };

  // update a blog
  const UpdatedBlog = async (e, user_id) => {
    e.preventDefault();

    const {data} = await axios.put(`http://localhost:8000/user/updatedblog/${user_id}/${editblog._id}`,{
      ...editblog
    })
    if(data.blogs){
      setUserBlogs(data.blogs);
      setIsModal(!isModal);
      getBlog();
    }
    else{
      setFormErrors(data.errors);
    }
  };

  // get information of blog to be updated
  const editBlog = async (user_id, blog_id) => {
    setIsModal(!isModal);
    seteditform("edit");
    const { data } = await axios.get(
      `http://localhost:8000/user/updateblog/${user_id}/${blog_id}`
    );
    setEditBlog(data);
  };

  // delete a blog
  const deleteBlog = async(user_id,blog_id)=>{
    const {data} = await axios.delete(`http://localhost:8000/user/deleteblog/${user_id}/${blog_id}`)
   
    if(data.message === "true")
    {
      getBlog();
    }
  }

  const setStateValue = () => {
    setIsModal(!isModal);
    seteditform("addnew");
  };

  return (
    <div className="main_container_dashboard">
      <div className="main_box_dashboard">
        <div className="left_section_dashboard">
          <div className="left_top_section_dashboard">
            <div className="left_top_left_section_dashboard">
              <h2>Hello, Gautam</h2>
              <p>
                Loreum ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
              <button
                className="primary_btn_dashboard"
                onClick={() => setStateValue()}
              >
                Write new Blog !
              </button>
            </div>

            <div className="left_top_right_section_dashboard">
              <img src={Studying} alt="studying" />
            </div>
          </div>

          <div className="left_bottom_section_dashboard">
            <h2>Top Articles</h2>

            <div className="blogs_container_dashboard">
              { userBlogs && userBlogs.map((blog, index) => (
                <div className="blog_box_dashboard" key={blog._id}>
                  <div className="blog_box_left_section_dashboard">
                    { index < 9 ? (<h3>0{index+1}</h3>) : (<h3>{index}</h3>)}
                    <img
                      src={blog.image}
                      alt="blog"
                    />
                  </div>

                  <div className="blog_box_right_section_dashboard">
                    <h2>{blog.title}</h2>
            
                    { blog.content.length > 40 ? (<p>{blog.content.substring(0, 40)}...</p>) : (<p>{blog.content.substring(0, 40)}</p>)}
                    
                    <h4>{blog.createdAt}</h4>
                  </div>

                  <div className="blog_box_end_section_dashboard">
                    <div className='content_logo_container_dashboard'>
                      <div className='content_logo_dashboard' onClick={()=>editBlog(id,blog._id)}>
                        <BiEditAlt size={22} className="content_icon_dashboard" />
                      </div>
                      <div className='content_logo_dashboard'>
                        <MdOutlineDelete size={22} color='#ef233c' onClick={()=>deleteBlog(id,blog._id)}/>
                      </div>
                    </div>

                    <div className="view_container_dashboard">
                      <Link to={`/blog/${id}/${blog._id}`}>View Blog</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right_section_dashboard">
          <div className="right_box_dashboard">
            <div className="right_box_left_section_dashboard">
              <AiOutlineFileText className="right_box_logo_dashboard" />
            </div>

            <div className="right_box_right_section_dashboard">
              <h3>$ 623</h3>
              <p>Total Earning</p>
            </div>
          </div>

          <div className="right_box_dashboard">
            <div className="right_box_left_section_dashboard">
              <BsBriefcase className="right_box_logo_dashboard" />
            </div>

            <div className="right_box_right_section_dashboard">
              <h3>13</h3>
              <p>Articles Requests</p>
            </div>
          </div>

          <div className="right_box_dashboard">
            <div className="right_box_left_section_dashboard">
              <MdOutlineDesignServices className="right_box_logo_dashboard" />
            </div>

            <div className="right_box_right_section_dashboard">
              <h3>03</h3>
              <p>Pending Requests</p>
            </div>
          </div>
        </div>
      </div>

      {isModal && (
        <div className="modal_backgound_dashboard">
          <div className="modal_container_dashboard">
            <div className="modal_top_section_dashboard">
              <h2>Blog Details</h2>
              <p className="errors_msg_dashboard">{formErrors.others}</p>
            </div>

            {editform === "addnew" ? (
              <div className="modal_mid_section_dashboard">
                <form>
                  <div className="form_box_dashboard">
                    <label>Blog Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter title"
                      onChange={handleForm}
                    />
                    <p className="errors_msg_dashboard">{formErrors.title}</p>
                  </div>

                  <div className="form_box_dashboard">
                    <label>Content</label>
                    <input
                      type="text"
                      name="content"
                      placeholder="Enter your content"
                      onChange={handleForm}
                    />
                    <p className="errors_msg_dashboard">{formErrors.content}</p>
                  </div>

                  <div className="form_box_dashboard">
                    <label>Image URL</label>
                    <input
                      type="text"
                      name="image"
                      placeholder="Enter your Image URL"
                      onChange={handleForm}
                    />
                    <p className="errors_msg_dashboard">{formErrors.image}</p>
                  </div>

                  <div className="form_box_dashboard">
                    <label>Created At</label>
                    <input
                      type="text"
                      name="createdAt"
                      placeholder="Enter created at date"
                      onChange={handleForm}
                    />
                    <p className="errors_msg_dashboard">
                      {formErrors.createdAt}
                    </p>
                  </div>

                  <div className="modal_bottom_section_dashboard">
                    <button className="btn_light_dashboard" onClick={Cancel}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={submitForm}
                      className="btn_primary_dashboard"
                    >
                      Save Details
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="modal_mid_section_dashboard">
                <form>
                  <div className="form_box_dashboard">
                    <label>Blog Title</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter blog title"
                      value={editblog.title || ""}
                      onChange={updateForm}
                    />
                    <p className="errors_msg_dashboard">{formErrors.title}</p>
                  </div>

                  <div className="form_box_dashboard">
                    <label>Content</label>
                    <input
                      type="text"
                      name="content"
                      placeholder="Enter your Content"
                      value={editblog.content || ""}
                      onChange={updateForm}
                    />
                    <p className="errors_msg_dashboard">{formErrors.content}</p>
                  </div>

                  <div className="form_box_dashboard">
                    <label>Image URL</label>
                    <input
                      type="text"
                      name="image"
                      placeholder="Enter Image URL"
                      value={editblog.image || ""}
                      onChange={updateForm}
                    />
                    <p className="errors_msg_dashboard">{formErrors.image}</p>
                  </div>

                  <div className="form_box_dashboard">
                    <label>Created At</label>
                    <input
                      type="text"
                      name="createdAt"
                      placeholder="Enter created at date"
                      value={editblog.createdAt || ""}
                      onChange={updateForm}
                    />
                    <p className="errors_msg_dashboard">
                      {formErrors.createdAt}
                    </p>
                  </div>

                  <div className="modal_bottom_section_dashboard">
                    <button className="btn_light_dashboard" onClick={Cancel}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={(e) => UpdatedBlog(e, id)}
                      className="btn_primary_dashboard"
                    >
                      Save Details
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
