import React, { useState } from 'react';
import { Button, Drawer, List } from 'antd';
const FavoritesBar = ( {AddedFavorites, setAddedFavorites} ) => {
    const [open, setOpen] = useState(false);
 
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    //instead of clearing the list, delete the specified item from the respective
    //list. Design decision based on the drawer not looking great with a clear button
    //splitting the list at the top.
    const deleteItem = (type, item) => {
        setAddedFavorites((prevFavorites) => ({
          ...prevFavorites,
          //filter type constructor driver or constructor or result
          [type]: prevFavorites[type].filter((favItem) => favItem !== item),
        }));
    };
    //Check if any favorites are present for each category. Render the 
    //List of favorites conditionally on if there are values for constructor,
    //driver, or circuits in the array of objects.
    const hasFavorites =
    AddedFavorites && (
    AddedFavorites.constructors.length > 0 ||
    AddedFavorites.drivers.length > 0 ||
    AddedFavorites.circuits.length > 0);
    
    //Display empty favorites list if hasFavorites arrays are empty.
    if (!hasFavorites) {
        return(
        <>
        <Button type="dashed" onClick={showDrawer}>
            Favorites
        </Button>
        <Drawer title="Favorites" width={520} closable={false} onClose={onClose} open={open}>
            <>
                <List
                header={<div>Constructors</div>}
                bordered
                />
                <List
                header={<div>Drivers</div>}
                bordered
                />
                <List
                header={<div>Circuits</div>}
                bordered
                />
            </>
        </Drawer>
        </>
        )
    }
    else{

    //   const clearFavorites = () => {
    //     setAddedFavorites({
    //       constructors: [],
    //       drivers: [],
    //       circuits: [],
    //     });
    //   };

    //console.log("this is "+ hasFavorites)
    return (
        <>
        <Button type="primary" onClick={showDrawer}>
            Favorites
        </Button>
        
        <Drawer title="Favorites" width={520} closable={false} onClose={onClose} open={open}>
            {hasFavorites && (
            <>
                <List
                header={<div>Constructors</div>}
                bordered
                dataSource={AddedFavorites.constructors}
                renderItem={(item) =>
                <List.Item className="flex justify-between items-center">
                    <div>{item.name}</div>
                    <div>
                        <Button type="default" onClick={() => deleteItem('constructors', item)}>
                            Remove
                        </Button>
                    </div>
                </List.Item>}
                />
                <List
                header={<div>Drivers</div>}
                bordered
                dataSource={AddedFavorites.drivers}
                renderItem={(item) => 
                <List.Item className="flex justify-between items-center">
                    <div>{item.name}</div>
                    <div>
                        <Button type="default" onClick={() => deleteItem('drivers', item)}>
                            Remove
                        </Button>
                    </div>
                </List.Item>}
                />
                <List
                header={<div>Circuits</div>}
                bordered
                dataSource={AddedFavorites.circuits}
                renderItem={(item) => 
                <List.Item className="flex justify-between items-center">
                    <div>{item.name}</div>
                    <div>
                        <Button type="default" onClick={() => deleteItem('circuits', item)}>
                            Remove
                        </Button>
                    </div>
                </List.Item>}
                />
            </>
            )}
        </Drawer>
        </>
    );
    }

};
export default FavoritesBar;