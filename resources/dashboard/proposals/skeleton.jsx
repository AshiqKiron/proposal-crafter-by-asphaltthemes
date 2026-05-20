import { SkeletonRow, SkeletonBar, TitleCell, ClientCell, AmountCell } from './style';

export const SkeletonLoader = ({ count = 3 }) => {
    return [...Array(count)].map((_, index) => (
        <SkeletonRow key={index}>
            <div><SkeletonBar width="16px" /></div>
            <TitleCell>
                <SkeletonBar width="60%" style={{ marginBottom: 4 }} />
                <SkeletonBar width="40%" height="12px" />
            </TitleCell>
            <ClientCell>
                <SkeletonBar width="70%" style={{ marginBottom: 2 }} />
                <SkeletonBar width="50%" height="12px" />
            </ClientCell>
            <AmountCell>
                <SkeletonBar width="60px" />
            </AmountCell>
            <div>
                <SkeletonBar width="80px" style={{ borderRadius: 999 }} />
            </div>
            <div>
                {/* Actions placeholder */}
            </div>
        </SkeletonRow>
    ));
};
