export default function Categories ({className,id="",array,additionKey="",chooseVal,value}) {

    return(
        <select className={className} id={id} onChange={chooseVal} value={value}>
                {array.map((el) => {
                  return (
                    <option className="filter_option" key={el + additionKey} >
                      {el}
                    </option>
                  );
                })}
              </select>
    )
}