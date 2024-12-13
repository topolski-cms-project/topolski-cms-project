import './ProductBar.css'
import {Component} from "react";

export default function ProductBar({product}) {
    console.log("ProductBar", product);
    return <div className='product-bar'>
        <div className='product-bar-image' style={{backgroundImage:`url(${process.env.REACT_APP_API_IMAGES}/${product.imageUrls[0]})`}}></div>
        <div className='product-bar-details'>
            <div className='product-bar-name'>
                <b>{product.name}</b>
            </div>
            <div className='product-bar-dimensions'>
                {product.height} cm Wys. {product.width} cm Szer. {product.depth} cm Głęb.
            </div>
        </div>
        <div className='product-bar-description'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse auctor, lectus non efficitur commodo, nisl lectus finibus mauris, ac varius nisi erat sed nulla. Phasellus et arcu in nisl vulputate facilisis. Proin eu odio consectetur, vestibulum mi quis, molestie mi. Pellentesque suscipit elementum ullamcorper. Phasellus id leo sit amet turpis vehicula finibus. Aliquam ac nunc turpis. Fusce viverra, mauris quis rutrum venenatis, nibh enim consequat nisl, sed pellentesque tortor orci eget odio. Etiam ullamcorper eros a metus porttitor, at luctus leo luctus. Duis tincidunt risus felis, nec aliquet arcu pharetra ut. Suspendisse varius, ligula eget bibendum sagittis, ante orci fermentum elit, sit amet cursus justo eros sed quam. Phasellus fermentum massa non quam vulputate, ac porttitor arcu faucibus. Pellentesque neque dui, bibendum a pulvinar sit amet, vestibulum a leo. Nam nec purus nunc.
            Nullam molestie turpis elit, et vehicula sem molestie gravida. In quis interdum nibh, sed gravida arcu. Proin sed venenatis ex, a feugiat lacus. Duis dapibus fringilla mauris, eget dictum arcu malesuada ut. Cras non tincidunt libero, ut mattis mi. Nunc in augue leo. Nullam dui mauris, viverra ac elementum in, egestas eu ante. Etiam sollicitudin lorem et arcu mattis aliquet. Cras vel leo est. Aliquam augue libero, maximus quis consectetur id, eleifend eget metus. Aliquam tincidunt, risus vitae consectetur tristique, ex ante pulvinar odio, vel condimentum augue enim non metus. Nullam eget turpis et arcu fermentum convallis eu nec enim.
            In sapien ante, sagittis vitae odio eu, pretium volutpat arcu. Cras faucibus faucibus ipsum, id posuere erat condimentum at. Aenean eget iaculis sem. Mauris maximus consectetur scelerisque. Sed consectetur consectetur odio. Vestibulum dui elit, luctus non felis ut, rhoncus tempor elit. Curabitur dictum ullamcorper dolor, faucibus posuere magna accumsan id. Sed quis blandit libero, sit amet eleifend lectus. Mauris condimentum id justo non semper. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec lobortis sem nec lobortis consequat. Pellentesque eros sem, scelerisque sit amet est at, aliquam elementum ex. Nullam feugiat purus id iaculis placerat.
            Mauris neque leo, tincidunt vel mattis ut, ultricies eget eros. Suspendisse sed magna non orci volutpat hendrerit. Ut ut odio eget elit ornare condimentum. Phasellus vulputate velit at efficitur vestibulum. Nullam vitae tincidunt dui. Nunc a sapien nisl. Morbi quis laoreet enim. Ut pulvinar non libero eget elementum. Nulla venenatis iaculis lectus eget condimentum.
        </div>
        <div className='product-bar-price'>
            <b>{product.price} zł</b>
        </div>
    </div>
}