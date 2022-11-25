import {
  CdkTree,
  CdkTreeNode,
  NestedTreeControl,
  TreeControl,
  CdkTreeNodeDef,
} from '@angular/cdk/tree';
import { Component, Injectable, OnInit } from '@angular/core';
import {
  ArrayDataSource,
  CollectionViewer,
  DataSource,
} from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';

export class TreeNestedDataSource<T> extends DataSource<T> {
  _data = new BehaviorSubject<T[]>([]);

  /**
   * Data for the nested treee
   */
  get data() { return this._data.value; }
  set data(value: T[]) { this._data.next(value); }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return merge(...[collectionViewer.viewChange, this._data])
      .pipe(map(() => {
        return this.data;
      }));
  }

  disconnect() {
    // no op
  }
}


export class FileNode {
  children: FileNode[];
  filename: string;
  filetype: number;
}

@Component({
  selector: 'app-mytree',
  templateUrl: './mytree.component.html',
  styleUrls: ['./mytree.component.css'],
  providers: [TreeNestedDataSource],
})
export class MytreeComponent implements OnInit {
  public Filess: FileNode[] = [
    {
      filename: 'flatfile1',
      filetype: 144,
      children:[]
    },
    {
      filename: 'flatfile2',
      filetype: 144,
      children:[]
    },
    {
      filename: 'compoundfile1',
      filetype: 145,
      children: [],
    },
  ];

  public newchild = {
    filename: 'flatfile-addedonDemand',
    filetype: 144,
  };

  public newchild_compundfile = {
    filename: 'compoundfile-addedonDemand',
    filetype: 145,
    children:[]
  };

  public compoundfiles_array = [
    {
      filename: 'compoundfile-addedonDemand_1',
      filetype: 145,
      children: []
    },
    {
      filename: 'compoundfile-addedonDemand_2',
      filetype: 145,
      children: []
    },
    {
      filename: 'compoundfile-addedonDemand_3',
      filetype: 145,
      children: []
    },
    {
      filename: 'compoundfile-addedonDemand_4',
      filetype: 145,
      children: []
    },
    {
      filename: 'compoundfile-addedonDemand_5',
      filetype: 145,
      children: []
    },
    {
      filename: 'compoundfile-addedonDemand_6',
      filetype: 145,
      children: []
    }
  ]



  mydatasource: TreeNestedDataSource<FileNode>;
  nestedTreeControl: NestedTreeControl<FileNode>;
  selectedFileName: string;
  childtraversernum: number = 0;

  private _getChildren = (node: FileNode) => observableOf(node.children);
  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData;

  constructor(private datasource: TreeNestedDataSource<FileNode>) {
    this.mydatasource = datasource;
    this.mydatasource._data.next(this.Filess)
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
  }



  addChildNodes(node) {
    if (node.filetype == 144) {
      this.selectedFileName = node.filename;
    } else {
      debugger;
      if (this.nestedTreeControl.isExpanded(node).valueOf() == true) {
         node.children.push(this.newchild);
        // node.children.push(this.newchild_compundfile);

      //   node.children.push(this.compoundfiles_array[this.childtraversernum]);
      //   this.childtraversernum++;
      // } else {
      //   this.childtraversernum--;
      //   node.children = [];
       }

      console.log(this.nestedTreeControl.isExpanded(node).valueOf());
      console.log(this.Filess);

      this.mydatasource._data.next([]);
      this.mydatasource._data.next(this.Filess); 

      if (!this.nestedTreeControl.isExpanded(node).valueOf() == true)
        this.nestedTreeControl.collapseDescendants(node);
    }
  }
  ngOnInit() {
  }
}
