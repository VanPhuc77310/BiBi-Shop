import React from "react";
import "./BlogPage.scss";
import blog1 from "../../../assets/user/images/listItem/oi.jpg";
import blog2 from "../../../assets/user/images/listItem/chuoi.jpg";
import blog3 from "../../../assets/user/images/listItem/hamburger.jpg";
import blog4 from "../../../assets/user/images/listItem/pate.jpg";

const blogs = [
    {
        id: 1,
        image: blog1,
        title: "Khám phá lợi ích tuyệt vời của quả Ổi cho sức khỏe",
        author: "Nguyễn Văn An",
        date: "10/06/2023",
        desc: "Ổi là loại trái cây quen thuộc với người Việt, giàu vitamin C, chất xơ và các khoáng chất thiết yếu. Ăn ổi thường xuyên giúp tăng cường hệ miễn dịch, hỗ trợ tiêu hóa và làm đẹp da. Cùng tìm hiểu thêm về những lợi ích tuyệt vời mà quả ổi mang lại cho sức khỏe!",
        tags: ["Trái cây", "Sức khỏe"]
    },
    {
        id: 2,
        image: blog2,
        title: "Chuối - Nguồn năng lượng tự nhiên cho ngày mới",
        author: "Trần Thị Bình",
        date: "05/06/2023",
        desc: "Chuối không chỉ thơm ngon mà còn là nguồn cung cấp kali, vitamin B6 và năng lượng dồi dào. Một quả chuối vào buổi sáng giúp bạn tỉnh táo, bổ sung năng lượng và hỗ trợ tim mạch hiệu quả. Hãy cùng khám phá các món ngon từ chuối nhé!",
        tags: ["Trái cây", "Dinh dưỡng"]
    },
    {
        id: 3,
        image: blog3,
        title: "Hamburger - Biểu tượng ẩm thực hiện đại",
        author: "Lê Minh Tuấn",
        date: "28/05/2023",
        desc: "Hamburger là món ăn nhanh nổi tiếng trên toàn thế giới, kết hợp giữa bánh mì mềm, thịt nướng thơm ngon và rau củ tươi mát. Dù xuất xứ từ phương Tây, hamburger đã trở thành món khoái khẩu của nhiều người Việt, đặc biệt là giới trẻ.",
        tags: ["Ẩm thực", "Món ăn nhanh"]
    },
    {
        id: 4,
        image: blog4,
        title: "Pate - Hương vị Pháp trong bữa ăn Việt",
        author: "Phạm Thị Hồng",
        date: "20/05/2023",
        desc: "Pate là món ăn có nguồn gốc từ Pháp, được người Việt biến tấu phù hợp với khẩu vị. Pate thường được dùng kèm bánh mì, xôi hoặc làm nhân bánh. Hương vị béo ngậy, thơm ngon của pate khiến ai cũng khó cưỡng lại.",
        tags: ["Ẩm thực", "Bữa sáng"]
    }
];

const BlogPage = () => (
    <div className="blogpage__container">
        {blogs.map(blog => (
            <div className="blogcard" key={blog.id}>
                <div className="blogcard__imgwrap">
                    <img src={blog.image} alt={blog.title} />
                </div>
                <div className="blogcard__content">
                    <h2 className="blogcard__title">{blog.title}</h2>
                    <div className="blogcard__meta">
                        <span className="blogcard__author">Tác giả: {blog.author}</span>
                        <span className="blogcard__date">Ngày đăng: {blog.date}</span>
                    </div>
                    <p className="blogcard__desc">{blog.desc}</p>
                    <a className="blogcard__read" href="#">Đọc bài viết →</a>
                    <div className="blogcard__tags">
                        {blog.tags.map(tag => (
                            <span className="blogcard__tag" key={tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default BlogPage; 