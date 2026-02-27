#include<stdio.h>

void main()
{
    printf("The simple for loop set to sorting \n");
    int a[]={10,80,7,0,80,30,1,88,44,2};

    for(int i=0 ;i<10; i++)
    {
        for(int j=0;j<10;j++)
        {
            if(a[i]<a[j])
            {
                int temp=a[i];
                a[i]=a[j];
                a[j]=temp;
            }
        }
    }
    printf("The reault is:");
    for(int i =0;i<10;i++)
    {
        printf("%d--",a[i]);
    }
}
