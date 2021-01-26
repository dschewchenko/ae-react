import {Component, createRef, RefObject} from "react";

export default class InfiniteScroll extends Component<InfiniteScrollProps> {
    private observer!: IntersectionObserver
    private anchorRef: RefObject<HTMLDivElement> = createRef()

    componentDidMount() {
        const {onScroll, margin} = this.props
        this.observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onScroll && onScroll()
            }
        }, {
            rootMargin: `${margin || 0}px`
        });

        if(this.anchorRef.current) {
            this.observer.observe(this.anchorRef.current);
        }
    }

    render() {
        const {children} = this.props
        return (
            <>
                {children}
                <div ref={this.anchorRef}/>
            </>
        );
    }
}

type InfiniteScrollProps = {
    onScroll: () => void,
    margin?: number
}
