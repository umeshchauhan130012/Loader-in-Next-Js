import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Fragment } from 'react'
export default function Home() {

  const BlogContent = () => {
    const [loder, setLoder] = useState(true)
    const [data, setData] = useState([])
    const [visible, setVisible] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null)
    const getClickData = () => {
      setVisible((visible) => visible + 10);
    };
    const indexOfLastItem = currentPage*visible;
    const indexOfFirstItem = indexOfLastItem - visible;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const finalLastData = currentItems.length;
    const arrAllData = data.length;
   
    useEffect(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoder(false)
      })
      .catch((error) => {
        setError(error.message)
        setLoder(false)
      });
    }, []);
    
    if(loder) {
      return(<div className='hbvbd'>Loading.....</div>)
    }
    if(error){
      return (<div className=''>Error</div>)
    }
    return (
      <div className={styles.blogData}>
        {
          data.slice(0, visible).map((item) => (
          <div className={styles.blogDtataItem} key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
          ))
        }
     {arrAllData == finalLastData ? "" :
     <div className={styles.morebtn}><span onClick={getClickData}>Load More</span></div>
     } 
      </div>
    )
}
  return (
    <Fragment>
      <BlogContent />
    </Fragment>  
  )
}