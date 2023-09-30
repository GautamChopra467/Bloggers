import React, { useEffect, useState } from 'react';
import "./Blog.css";
import Header from '../../shared/widgets/Header/Header';
import axios from "axios";
import { useParams } from 'react-router-dom';

const Blog = () => {
    
    const { user_id, blog_id } = useParams();

    const [blog, setBlog] = useState({});

    const getBlog = async (user_id, blog_id) => {
        const { data } = await axios.get(
          `http://localhost:8000/user/updateblog/${user_id}/${blog_id}`
        );
 
        setBlog(data);
    };

    useEffect(() => {
        getBlog(user_id, blog_id);
    }, []);

  return (
    <div>
      <Header />

      <div className='main_container_blog'>
        { blog && (
        <div className='main_box_blog'>
            <div className='display_section_blog'>
                <div className='display_top_section_blog'>
                    <h2>{blog.title}</h2>
                    <p>{blog.createdAt}</p>
                </div>

                <div className='display_middle_section_blog'>
                    <img src={blog.image} />
                </div>

                <div className='display_bottom_section_blog'>
                    <h3>By - James Luke</h3>
                    <p>{blog.content}
                    </p>
                </div>
            </div>
        </div>
        )}
      </div>
    </div>
  )
}

export default Blog
