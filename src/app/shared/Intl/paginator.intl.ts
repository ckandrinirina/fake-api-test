import { MatPaginatorIntl } from '@angular/material/paginator';

export class FrenchMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Articles par page:';
  override nextPageLabel = 'Page suivante';
  override previousPageLabel = 'Page précédente';
  override firstPageLabel = 'Première page';
  override lastPageLabel = 'Dernière page';

  override getRangeLabel = function (page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return `0 sur ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} sur ${length}`;
  };
}
