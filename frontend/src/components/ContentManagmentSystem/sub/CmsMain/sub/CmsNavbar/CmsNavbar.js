import './CmsNavbar.css'

export default function ({setCurrentTab, currentTab}) {
    return <div id='cms-navbar'>
        <div id='cms-add-bttn' className={currentTab === "add-product" ? 'cms-nav-bttn-active' : 'cms-nav-bttn'}
             onClick={() => setCurrentTab('add-product')}>
            <div id='cms-add-icon' className='cms-icon'></div>
            <span className='cms-bttn-label'>Dodaj produkt</span>
        </div>
        <div id='cms-edit-bttn' className={currentTab === "edit-product" ? 'cms-nav-bttn-active' : 'cms-nav-bttn'}
             onClick={() => setCurrentTab('edit-product')}>
            <div id='cms-edit-icon' className='cms-icon'></div>
            <span className='cms-bttn-label'> Edytuj produkty</span>
        </div>
        <div id='cms-stats-bttn' className={currentTab === "statistics" ? 'cms-nav-bttn-active' : 'cms-nav-bttn'}
             onClick={() => setCurrentTab('statistics')}>
            <div id='cms-stats-icon' className='cms-icon'></div>
            <span className='cms-bttn-label'>Statystyki</span>
        </div>
        <div id='cms-stats-bttn' className={currentTab === "reviews" ? 'cms-nav-bttn-active' : 'cms-nav-bttn'}
             onClick={() => setCurrentTab('reviews')}>
            <div id='cms-reviews-icon' className='cms-icon'></div>
            <span className='cms-bttn-label'>Opinie</span>
        </div>
        <div id='cms-stats-bttn' className={currentTab === "discounts" ? 'cms-nav-bttn-active' : 'cms-nav-bttn'}
             onClick={() => setCurrentTab('discounts')}>
            <div id='cms-discounts-icon' className='cms-icon'></div>
            <span className='cms-bttn-label'>Promocje</span>
        </div>
    </div>
}